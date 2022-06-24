//require react and default
const React = require('react');
const Default = require('./layouts/Default');

//show function for baker
function Show ({baker}) {
    return(
        <Default>
            <h3>{baker.name}</h3>
            <p>{baker.name} has been baking with us since {baker.startDate.getFullYear()}</p>
            <p>About {baker.name}: {baker.bio}</p>
            <h3>Breads {baker.name} has baked</h3>
            {/* Breads list */}
            <ul>
                {/* map the baker.breads array that was virtually populated */}
                {
                    baker.breads.map((bread) => {
                        return(
                            <li key={bread.id}>
                                {bread.name}
                            </li>
                        )
                    })
                }
            </ul>
        </Default>
    )
}

//export
module.exports = Show