const React = require('react')
const Default = require('./layouts/Default')

//passes bakers
function New ({bakers}) {
    return (
      <Default>
        <h2>Add a new bread</h2>
        <form action="/breads" method="POST">
          {/* NAME */}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
          />
          {/* IMAGE */}
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            id="image"/>
          {/* BAKER */}
          <label htmlFor="baker">Baker</label>
          <select name="baker" id="baker">
            {/* Maps over baker's array and returns each option element
            that has value attribute equal to current baker's ID
            and sets text to current baker's name */}
            {bakers.map((baker) => {
              return(
                <option value={baker.id} key={baker.id}>{baker.name}</option>
              )
            })}
          </select>
            {/* GLUTEN? */}
          <label htmlFor="hasGluten">Has Gluten?</label>
          <input
            type="checkbox"
            name="hasGluten"
            id="hasGluten"
            defaultChecked
          />
          <br />
          <input type="submit"/>
        </form>
        <div className="backButton">
            <a href="/breads"><button>Go back to the index</button></a>
        </div>
      </Default>
    )
}

module.exports = New


module.exports = New
