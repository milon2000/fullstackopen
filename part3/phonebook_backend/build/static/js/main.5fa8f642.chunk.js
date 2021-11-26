(this.webpackJsonpphonebook = this.webpackJsonpphonebook || []).push([[0], {
  41(e, n, t) {},
  42(e, n, t) {
    t.r(n); const c = t(1); const r = t.n(c); const a = t(16); const o = t.n(a); const u = t(7); const i = t(3); const s = t(0); const d = function (e) { return Object(s.jsxs)('div', { children: ['filter shown with', ' ', Object(s.jsx)('input', { onChange: e.handleSearchChange, value: e.searchTerm })] }) }; const l = function (e) { return Object(s.jsxs)('form', { onSubmit: e.addPerson, children: [Object(s.jsxs)('div', { children: ['name: ', Object(s.jsx)('input', { value: e.newName, onChange: e.handlePersonChange })] }), Object(s.jsxs)('div', { children: ['number: ', Object(s.jsx)('input', { value: e.newNumber, onChange: e.handleNumberChange })] }), Object(s.jsx)('div', { children: Object(s.jsx)('button', { type: 'submit', children: 'add' }) })] }) }; const j = function (e) { const n = e.person; const t = e.deletePerson; return Object(s.jsxs)('li', { children: [n.name, n.number, Object(s.jsx)('button', { onClick: t, children: 'delete' })] }) }; const h = function (e) { const n = e.personsToShow; const t = e.deletePerson; return Object(s.jsx)('ul', { children: n.map(((e) => Object(s.jsx)(j, { person: e, deletePerson() { return t(e.id) } }, e.id))) }) }; const b = function (e) { const n = e.message; return n === null ? null : Object(s.jsx)('div', { className: 'notification', children: n }) }; const f = function (e) { const n = e.errorMessage; return n === null ? null : Object(s.jsx)('div', { className: 'error', children: n }) }; const m = t(4); const O = t.n(m); const p = '/api/persons'; const x = function () { return O.a.get(p).then(((e) => e.data)) }; const v = function (e) { return O.a.post(p, e).then(((e) => e.data)) }; const w = function (e, n) { return O.a.put(''.concat(p, '/').concat(e), n).then(((e) => e.data)) }; const g = function (e, n) { return O.a.delete(''.concat(p, '/').concat(e), n).then(((e) => e.data)) }; const C = function () {
      const e = Object(c.useState)([]); const n = Object(i.a)(e, 2); const t = n[0]; const r = n[1]; const a = Object(c.useState)(''); const o = Object(i.a)(a, 2); const j = o[0]; const m = o[1]; const O = Object(c.useState)(''); const p = Object(i.a)(O, 2); const C = p[0]; const S = p[1]; const N = Object(c.useState)(''); const P = Object(i.a)(N, 2); const k = P[0]; const T = P[1]; const M = Object(c.useState)(null); const y = Object(i.a)(M, 2); const D = y[0]; const E = y[1]; const I = Object(c.useState)(null); const J = Object(i.a)(I, 2); const L = J[0]; const A = J[1]; Object(c.useEffect)((() => { x().then(((e) => { r(e) })) }), []); const B = t.filter(((e) => e.name.toLowerCase().includes(k.toLowerCase()))); return Object(s.jsxs)('div', {
        children: [Object(s.jsx)('h1', { children: 'Phonebook' }), Object(s.jsx)(b, { message: D }), Object(s.jsx)(f, { errorMessage: L }), Object(s.jsx)(d, { handleSearchChange(e) { T(e.target.value) }, searchTerm: k }), Object(s.jsx)('h2', { children: 'add a new' }), Object(s.jsx)(l, {
          addPerson(e) { e.preventDefault(); const n = { name: j, number: C, id: Math.floor(1e3 * Math.random()) }; const c = t.find(((e) => e.name === j)); const a = Object(u.a)(Object(u.a)({}, c), {}, { number: C }); c ? window.confirm(''.concat(c.name, ' is already added to phonebook, replace the old number with a new one?')) && w(c.id, a).then(((e) => { r(t.map(((n) => (n.name === j ? e : n)))), E('Updated '.concat(c.name)), setTimeout((() => { E(null) }), 5e3) })).catch(((e) => { A(' Information of \''.concat(c.name, '\' has already been removed from server')), r(t.filter(((e) => e.name !== c.name))), setTimeout((() => { A(null) }), 5e3), m(''), S('') })) : v(n).then(((e) => { r(t.concat(e)), E('Added chuj '.concat(n.name)), setTimeout((() => { E(null) }), 5e3), m(''), S('') })).catch(((e) => { console.log('tu kurwa'), A(e.response.data), setTimeout((() => { A(null) }), 5e3) })) }, newName: j, handlePersonChange(e) { m(e.target.value) }, newNumber: C, handleNumberChange(e) { S(e.target.value) },
        }), Object(s.jsx)('h2', { children: 'Numbers' }), Object(s.jsx)(h, { personsToShow: B, deletePerson(e) { const n = t.find(((n) => n.id === e)); window.confirm('Delete '.concat(n.name, '?')) && g(e).then(((n) => { r(t.filter(((n) => n.id !== e))) })) } })],
      })
    }; t(41); o.a.render(Object(s.jsx)(r.a.StrictMode, { children: Object(s.jsx)(C, {}) }), document.getElementById('root'))
  },
}, [[42, 1, 2]]])
// # sourceMappingURL=main.5fa8f642.chunk.js.map
