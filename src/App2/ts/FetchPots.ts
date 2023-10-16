async function fetchPots():Promise<Response>{
  return await fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res)
}

export {fetchPots};