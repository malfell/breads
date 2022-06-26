const React = require('react')
const Default = require('./layouts/Default')

function Index ({breads, title, bakers})  {
  return (
    <Default title={title}>
      <h2>Index Page</h2>
      {/* BAKER INFO */}
      <h3>Bakers</h3>
      <ul>
        {
          bakers.map((baker) => {
            return(
              // after using .lean(), "id" must be changed to "_id"
              //JS is more specific!
              <li key={baker._id}>
                <a href={`/bakers/${baker._id}`}>{baker.name}</a>
              </li>
            )
          })
        }
      </ul>
      <h3>Breads</h3>
      {/* <p>I have {breads[0].name} bread!</p> */}
      {/* This is a JSX comment. */}
      <ul>
        {
          breads.map((bread, index)=> {
            return (
            <li key={bread._id}>
              {/* sets up links to index */}
              <a href={`/breads/${bread._id}`}>
                {bread.name}
              </a>
              
            </li>)
          }) 
        }
      </ul>
      <div className="newButton">
        <a href="/breads/new"><button>Add a new bread</button></a>
      </div>


    </Default>

  )
}


module.exports = Index
