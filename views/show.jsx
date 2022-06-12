const React = require('react')
const Default = require('./layouts/Default')

//add index or index won't be defined
function Show ({bread, index}) {
    // Confirm we are getting our bread data in the terminal.
    // console.log(bread.name)
      return (
        <Default>
        <h3>{bread.name}</h3>
        <p>
            and it
            {
            bread.hasGluten
            ? <span> does </span>
            : <span> does NOT </span>
            }
            have gluten.
        </p>
        <img src={bread.image} alt={bread.name} />
        <li>
          <a href="/breads">Go home</a>
        </li>
        {/* EDIT BUTTON */}
        <a href={`/breads/${index}/edit`}><button>Edit</button></a>

        {/* Delete Form */}
        <form action={`/breads/${index}?_method=DELETE`} method="POST">
          <input type='submit' value="DELETE"/>
        </form>


        </Default>

      )
  }
  

// export Show function
module.exports = Show
