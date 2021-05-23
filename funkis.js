
const c = (p1, func) => p2 => func(p1, p2)

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

const aPipe = (...fns) => async x => await fns.reduce(
    async (valP, f) => await f(await valP),
    x
)

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

const isFunction = obj => !!(obj && obj.constructor && obj.call && obj.apply);
