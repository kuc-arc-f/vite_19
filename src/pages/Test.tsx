
import { render } from 'preact'
import { useEffect, useState } from 'preact/hooks';
//import Head from '../../components/Head';
//
let pageItems: any[] = [];
const dataItems: any[] = [
  {id:1, title: "title_1"},
  {id:2, title: "title_2"},
  {id:3, title: "title_3"},
];
let items: any[] = [];
//
export default function App() {
  const [count, setCount] = useState(0);  
  const [updatetime, setUpdatetime] = useState("");
  //
  useEffect(() => {
    (async() => {
//      pageItems = dataItems;
//      setUpdatetime(new Date().toString());
    })()
  }, []);
  //
  const addItem = async function(){
    try{
      console.log("testProc" + new Date().toString());
      const item = { param1: 1111 };
      const body = JSON.stringify(item);		
      const res = await fetch("/api/test/test1", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json();
console.log(json);      
    } catch (e) {
      console.error(e);
    } 
  }
  //
  return (
  <div class="container mx-auto my-2 px-8 bg-white">
    <h1 class="text-4xl font-bold">Test.tsx</h1>
    <hr class="my-2" />
    <div class="card">
      <button class="btn-purple my-1" onClick={() => addItem()}>Save
      </button>
    </div>
    <hr />
  </div>
  )
}