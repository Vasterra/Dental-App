import React from "react";
import {API, Auth} from "aws-amplify";
import Router from "next/router";
import {createDentist} from "../graphql/mutations";
import {listDentists} from "../graphql/queries";
import {convertCityCoords} from "../utils/search/converCityCoords";
import Close from '@material-ui/icons/Close';

interface State {
    username: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
    user: null;
}

const Login = ({}) => {

    const [values, setValues] = React.useState<State>({
        username: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        user: null,
    });

    async function signIn(event: { preventDefault: () => void; }) {
        event.preventDefault();
        try {
            const user = await Auth.signIn(values.username, values.password);
            setValues({...values, user})

            const dentists: any = await API.graphql({
                query: listDentists,
                // @ts-ignore
                authMode: 'AWS_IAM'
            })
            const dentistEmail = dentists.data.listDentists.items.find((item: { email: any; }) => item.email === user.attributes.email)
            if (dentists.data.listDentists.items.length !== 0) {
                if (!dentistEmail) {
                    await createNewDentist(user);
                }
            } else {
                await createNewDentist(user);
            }
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async function createNewDentist(user: { attributes: { sub: any; email: any; phone_number: any; }; }) {
        await convertCityCoords().then(async (result) => {
            await API.graphql({
                query: createDentist,
                variables: {
                    input: {
                        id: user.attributes.sub,
                        email: user.attributes.email,
                        lat: result.lat,
                        lng: result.lng,
                        firstName: values.username,
                        registered: true,
                        phone: user.attributes.phone_number,
                    }
                },
                // @ts-ignore
                authMode: 'AWS_IAM'
            })
            await Router.replace('/search')
        })
    }

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (values.user) Router.replace('/')

    return (
        <div className="main bg-login main-box">
            <div className="form-login">
                <p className="form-login-title green">Login</p>
                <p className="form-login-subtitle gray">Current FYD users</p>
                <form onSubmit={signIn}>
                    <p className="form-login-input">
                        <input
                            type="text"
                            name="username"
                            value={values.username}
                            id="username"
                            placeholder="Username"
                            onChange={(e) => setValues({...values, username: e.target.value})}
                        />
                        <Close className="form-login-input-close" onClick={() => setValues({...values, username: ''})}/>
                    </p>
                    <p className="form-login-input">
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setValues({...values, password: e.target.value})}
                        />
                        <Close className="form-login-input-close" onClick={() => setValues({...values, password: ''})}/>
                    </p>
                    <p className="form-login-buttons">
                        <button type="submit" className="button-green">Login</button>
                        <button className="button-white">Reset password</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

