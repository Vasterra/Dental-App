export const switcher = () => {
    const switcher = document.querySelector(".switcher")
    let flag = true
    switcher.addEventListener("click", () => {
        if (flag === true) {
            switcher.style.cssText = `padding: 4px 4px 4px 4px;`
            const changeClass = document.querySelectorAll(".switcher-text")
            document.querySelector(".left-size").style.cssText = `display: none`
            for (let i = 0; i < changeClass.length; i++) {
                changeClass[i].classList.toggle("strong")
            }
            flag = false
        } else {
            switcher.style.cssText = `padding: 4px 4px 4px 20px;`
            const changeClass = document.querySelectorAll(".switcher-text")
            document.querySelector(".left-size").style.cssText = ``
            for (let i = 0; i < changeClass.length; i++) {
                changeClass[i].classList.toggle("strong")
            }
            flag = true
        }
    })
}