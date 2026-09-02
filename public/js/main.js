// FRONT-END (CLIENT) JAVASCRIPT HERE
// Declaring html element here so we can access it in all fucntions (i think)
let ul = null;

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  //Recieve JSON data from the server
  const data = await response.json();
  console.log( 'text:', data );

  ul.innerHTML = ''
  // Create a list item for each JSON entry
  for (let item of data){
    const li = document.createElement('li')
    li.innerText = `${item.yourname}`
    ul.appendChild(li)
  }

}

window.onload = function() {
  const button = document.querySelector('button')
  button.onclick = submit

  //Creating html element and adding it to the body
  ul = document.createElement('ul');
  document.body.appendChild(ul);
}
