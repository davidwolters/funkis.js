const $ = el => {
    if (typeof el === 'string')
        return Array.from(document.querySelectorAll(el))
    if (el instanceof NodeList)
        return Array.from(el)
    if (el instanceof HTMLElement)
        return [el]
    return el 
}

const $1 = el => {
    if (typeof el === 'string')
        return document.querySelector(el)
    if (el instanceof NodeList)
        return el[0]
    return null
}


const find = (el, selector) => $($1(el).querySelectorAll(selector))
const find1 = (el, selector) => $1($1(el).querySelectorAll(selector))

const attr = (el, name, val = undefined) => {
    const attrs = $(el).map( e => val === undefined ? e.getAttribute(name) : e.setAttribute(name, val))
    return attrs.length === 1 ? attrs[0] : attrs
}

const parent = (el, level=1) => {
    el = $1(el)
    if (Array.isArray(el))
        return undefined
    if (level === 1)
        return el.parentElement
    return parent(el.parentElement, level - 1)
}

const children = el => {
    el = $1(el)
    if (Array.isArray(el))
        return undefined
    return $(el.childNodes)
}

// #region Classes //
const classes = (el, name) => {
    const c = $(el).map(e => name === undefined ? e.className : e.className = name)
    return c.length === 1 ? attrs[0] : attrs
}

const toggleClass = (el, name) => $(el).forEach(e => e.classList.toggle(name)) 
const addClass = (el, name) => $(el).forEach(e => e.classList.add(name))
const delClass = (el, name) => $(el).forEach(e => e.classList.remove(name))
// //#endregion // 

const id = (el, val) => attr(el, 'id', val)
const method = (el, val) => attr(el, 'method', val)
const action = (el, val) => attr(el, 'action', val)
const data = (el, name, val) => attr(el, `data-${name}`, val)


const html = (el, val) => {
    const htmls = $(el).map(e => val === undefined ? e.innerHTML : e.innerHTML = val)
    return htmls.length === 1 ? htmls[0] : htmls
} 
const append = (el, val) => $(el).forEach(e => e.append(val))
const prepend = (el, val) => $(el).forEach(e => e.prepend(val))

const clone = el => s(el).forEach(e => e.cloneNode(true))
const cloneShallow = el => s(el).forEach(e => cloneNode())

const on = (el, event, handler) => $(el).forEach(e => e.addEventListener(event, handler))

const onBlocking = (el, event, handler) => on(el, event, e => {
    e.preventDefault()
    handler(e)
})

const click = (el, handler) => on(el, 'click', handler)
const clickBlocking = (el, handler) => onBlocking(el, 'click', handler)

const change = (el, handler) => on(el, 'change', handler)
const changeBlocking = (el, handler) => onBlocking(el, 'change', handler)

const submit = (el, handler) => on(el, 'submit', handler)
const submitBlocking = (el, handler) => onBlocking(el, 'click', handler) 


const toQueryString = data => {
    if (typeof data === 'string') 
        return toQueryString(new FormData(s(data)))

    if (!(data instanceof FormData))
        return toQueryString(new FormData(data))

    return new URLSearchParams(data).toString()
}

const serialize = data => {
    if (typeof data === 'string') {
        data = s(el)
        return serialize(new FormData(data))
    }
    if (!(data instanceof FormData))
        return serialize(new FormData(data))

    var object = {}
    console.log(data instanceof FormData)
    data.forEach((value, key) => {
        if(!Reflect.has(object, key)){
            object[key] = value
            return
        }
        if(!Array.isArray(object[key])){
            object[key] = [object[key]]
        }
        object[key].push(value)
    });
    return object
}
