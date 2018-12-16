const convert = require('color-convert')
const fontManager = require('font-manager')
// get all of the fonts
let fonts

const $container = document.querySelector('#container')
const $fontlist = document.querySelector('#fontlist')
// header
const $search = document.querySelector('#search')
const $text = document.querySelector('#text')
const $moreBtn = document.querySelector('#moreBtn')
/// more setting
const $moreSetting = document.querySelector('#moreSetting')
//// background color
const $bgColor = document.querySelector('#bgColor')
const $bgRedRange = document.querySelector('#bgRedRange')
const $bgGreenRange = document.querySelector('#bgGreenRange')
const $bgBlueRange = document.querySelector('#bgBlueRange')
const $bgRed = document.querySelector('#bgRed')
const $bgGreen = document.querySelector('#bgGreen')
const $bgBlue = document.querySelector('#bgBlue')
//// font color
const $fontColor = document.querySelector('#fontColor')
const $fontRedRange = document.querySelector('#fontRedRange')
const $fontGreenRange = document.querySelector('#fontGreenRange')
const $fontBlueRange = document.querySelector('#fontBlueRange')
const $fontRed = document.querySelector('#fontRed')
const $fontGreen = document.querySelector('#fontGreen')
const $fontBlue = document.querySelector('#fontBlue')
const $fontSize = document.querySelector('#fontSize')
const defaultText = '123 abc'
let moreSettingHeight = 0

// onDOMContentLoaded func also main func
const onLoad = () => {
    fonts = fontManager.getAvailableFontsSync().sort((a, b) => {
        const A = a.family.toUpperCase()
        const B = b.family.toUpperCase()
        if (A < B) return -1
        if (A > B) return 1
        return 0
    })
    console.log(fonts)

    for (let i = fonts.length-1; i >= 0; i--) {
        const family = fonts[i].family
        const weight = fonts[i].weight
        const isItalic = fonts[i].italic
        const style = fonts[i].style
        const isCondensed = !!(style.match(/Condensed/))
        const isOblique = !!(style.match(/Oblique/))
        $fontlist.insertAdjacentHTML('afterbegin', 
`<div class="font" data-font="${family} ${style}">
    <div class="text" style="font-family: '${family}'; font-weight: ${weight}; font-style: ${(isItalic)?'italic':''} ${(isOblique)?'oblique':''}; font-stretch: ${(isCondensed)?'condensed':''};">${defaultText}</div>
    <div class="font-name">${family} ${style}</div>
</div>`
        )
    }

    // register listener
    /// search onchange
    $search.addEventListener('input', searchFont)
    /// text onchange
    $text.addEventListener('input', onTextChange)
    /// open/close setting
    $moreBtn.addEventListener('click', moreToggle)
    /// reset background color
    $bgColor.addEventListener('change', changeBgColor)
    $bgRedRange.addEventListener('change', changeBgColor)
    $bgRed.addEventListener('change', changeBgColor)
    $bgGreenRange.addEventListener('change', changeBgColor)
    $bgGreen.addEventListener('change', changeBgColor)
    $bgBlueRange.addEventListener('change', changeBgColor)
    $bgBlue.addEventListener('change', changeBgColor)
    /// reset font color
    $fontColor.addEventListener('change', changeFontColor)
    $fontRedRange.addEventListener('change', changeFontColor)
    $fontRed.addEventListener('change', changeFontColor)
    $fontGreenRange.addEventListener('change', changeFontColor)
    $fontGreen.addEventListener('change', changeFontColor)
    $fontBlueRange.addEventListener('change', changeFontColor)
    $fontBlue.addEventListener('change', changeFontColor)

    $fontSize.addEventListener('change', changeFontSize)

    setTimeout(() => {
        moreSettingHeight = $moreSetting.clientHeight
        moreToggle()
    }, 1)
}

// search font
const searchFont = () => {
    const searchString = $search.value.trim().toUpperCase()
    if (searchString === '') {
        document.querySelectorAll('.font').forEach(elem => {
            elem.classList.remove('hide-font')
        })
    } else {
        document.querySelectorAll('.font').forEach(elem => {
            if (elem.dataset.font.toUpperCase().indexOf(searchString) === -1) {
                elem.classList.add('hide-font')
            } else {
                elem.classList.remove('hide-font')
            }
        })
    }
}

// onTextChange set new text
const onTextChange = () => {
    const text = $text.value || defaultText
    document.querySelectorAll('.text').forEach(elem => {
        elem.textContent = text
    })
}

// open/close setting menu
let moreOpened = true
const moreToggle = () => {
    // 画面上部に勝手に戻る問題を無理やり解決
    const y = window.scrollY
    setTimeout(() => window.scroll(0,y), 1)
    //window.scroll(0,y)

    if (moreOpened = !moreOpened) {
        $moreSetting.style.height = `${moreSettingHeight + 5}px`
        $container.addEventListener('click', moreToggle)
        $moreBtn.classList.add('opened')
    } else {
        $moreSetting.style.height = '0'
        $container.removeEventListener('click', moreToggle)
        $moreBtn.classList.remove('opened')
    }
}

// change background color
const changeBgColor = e => {
    switch (e.target) {
        case $bgColor:
        {
            console.log('bgColor was changed')
            const bgColor = convert.hex.rgb($bgColor.value.substr(1))
            $bgRedRange.value = $bgRed.value = bgColor[0]
            $bgGreenRange.value = $bgGreen.value = bgColor[1]
            $bgBlueRange.value = $bgBlue.value = bgColor[2]
        }
        break
        case $bgRedRange:
        case $bgGreenRange:
        case $bgBlueRange:
        {
            console.log('range was changed')
            const red = $bgRed.value = $bgRedRange.value
            const green = $bgGreen.value = $bgGreenRange.value
            const blue = $bgBlue.value = $bgBlueRange.value
            $bgColor.value = '#' + convert.rgb.hex(red, green, blue)
        }
        break
        case $bgRed:
        case $bgGreen:
        case $bgBlue:
        {
            console.log('number was changed')
            const red = $bgRedRange.value = $bgRed.value
            const green = $bgGreenRange.value = $bgGreen.value
            const blue = $bgBlueRange.value = $bgBlue.value
            $bgColor.value = '#' + convert.rgb.hex(red, green, blue)
        }
        break
        default:
            console.log('uncaught')
        break
    }

    document.body.style.backgroundColor = $bgColor.value
}

// change font color
const changeFontColor = e => {
    switch (e.target) {
        case $fontColor:
        {
            console.log('fontColor was changed')
            const fontColor = convert.hex.rgb($fontColor.value.substr(1))
            $fontRedRange.value = $fontRed.value = fontColor[0]
            $fontGreenRange.value = $fontGreen.value = fontColor[1]
            $fontBlueRange.value = $fontBlue.value = fontColor[2]
        }
        break
        case $fontRedRange:
        case $fontGreenRange:
        case $fontBlueRange:
        {
            console.log('range was changed')
            const red = $fontRed.value = $fontRedRange.value
            const green = $fontGreen.value = $fontGreenRange.value
            const blue = $fontBlue.value = $fontBlueRange.value
            $fontColor.value = '#' + convert.rgb.hex(red, green, blue)
        }
        break
        case $fontRed:
        case $fontGreen:
        case $fontBlue:
        {
            console.log('number was changed')
            const red = $fontRedRange.value = $fontRed.value
            const green = $fontGreenRange.value = $fontGreen.value
            const blue = $fontBlueRange.value = $fontBlue.value
            $fontColor.value = '#' + convert.rgb.hex(red, green, blue)
        }
        break
        default:
            console.log('uncaught')
        break
    }

    $container.style.color = $fontColor.value
}

// change text font size
const changeFontSize = () => {
    const size = $fontSize.value + 'px'
    console.log($fontSize.value)
    document.querySelectorAll('.text').forEach(elem => {
        elem.style.fontSize = size
    })
}

// register main listener
document.addEventListener('DOMContentLoaded', onLoad)