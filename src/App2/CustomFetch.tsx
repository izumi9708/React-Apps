
export async function useFetch(url:string):Promise<Response>{
  return await fetch(url)
}

export default useFetch;