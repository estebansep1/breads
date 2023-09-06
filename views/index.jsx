const React = require('react')
const Default = require('./layouts/Default')

function Index ({breads, title})  {
    return (
        <Default title={title}>
  <h2>Index Page</h2>
  {/* <p>I have {breads[0].name} bread!</p> */}
  {/* This is a JSX comment. */}
    <div className="newButton">
    <a href="/breads/new"><button>Add a new bread</button></a>
    </div>

  <ul>
  {console.log(breads)}
  {
    breads.map((bread, index)=> {
      return (
        <li key={index}>
          <a href={`/breads/${bread.id}`}>
               {bread.name}
          </a>
          <p>{bread.getBakedBy()}</p>
        </li>
      )
    })
}
  </ul>
</Default>
)}
module.exports = Index
