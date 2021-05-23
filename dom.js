

const s = el => {
    if (Array.isArray(el) || el instanceof NodeList) 
        el = el[0]

   if (typeof el === 'string') 
        el = document.querySelector(el)
    return el
}


const parent = (el, level=1) => {
    el = s(el)
    if (level === 1) return el.parentElement 
    
    return S.parent(el.parentElement, level - 1)
}

const children = el => s(el).childNodes
const selector = (el, selector) => s(el).querySelectorAll(selector)
const clone = el => s(el).cloneNode(true)
const cloneShallow = el => s(el).cloneNode()

const attr = (el, key, val) => {
    el = s(el)
    if (val === undefined) 
        return el.getAttribute(key)
    el.setAttribute(key, val)
}

const getClass = (el, val) => val === undefined ? s(el).className : s(el).className = val
const toggleClass = (el, className) => s(el).classList.toggle(className)
const addClass = (el, className) => s(el).classList.add(className)
const delClass = (el, className) => s(el).classList.remove(className)

const id = (el, val) => attr(el, 'id', val)
const html = (el, val) => val === undefined ? s(el).innerHTML : s(el).innerHTML = val 
const method = (el, val) => attr(el, 'method', val)
const action = (el, val) => attr(el, 'action', val)

const append = (el, val) => s(el).append(val) 
const prepend = (el, val) => s(el).prepend(val) 

const req = async (url, body, options, headers) => await fetch(url, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body,
    ...options,
    headers: {
        'Content-Type': 'application/json',
        ...headers
    }
})

const reqFromObj = async obj => await req(obj.url, obj.body, obj.options, obj.headers)

const get = async (url, body, options, headers) => await req(url, body, {method: 'GET', ...options}, headers)
const getFromObj = async obj => await get(obj.url, obj.body, obj.options, obj.headers)

const post = async (url, body, options, headers) => await req(url, body, {method: 'POST', ...options}, headers)
const postFromObj = async obj => await post(obj.url, obj.body, obj.options, obj.headers)

const put = async (url, body, options, headers) => await req(url, body, {method: 'PUT', ...options}, headers)
const putFromObj = async obj => await put(obj.url, obj.body, obj.options, obj.headers)

const del =async (url, body, options, headers) => await req(url, body, {method: 'DELETE', ...options}, headers)
const delFromObj = async obj => await del(obj.url, obj.body, obj.options, obj.headers)
    

const on = (el, event, handler) => s(el).addEventListener(event, handler)

const onBlocking = (el, event, handler) => s(el).addEventListener(event, e => {
    e.preventDefault()
    handler(e)
})

const click = (el, handler) => on(el, 'click', handler)
const change = (el, handler) => on(el, 'change', handler)
const submit = (el, handler) => on(el, 'submit', handler)
const submitBlocking = (el, handler) => onBlocking(el, 'submit', handler)


// Forms
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
