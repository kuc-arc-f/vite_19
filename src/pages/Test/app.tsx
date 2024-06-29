import { useEffect, useState } from 'preact/hooks';
//import Head from '../../components/Head';
//import HttpCommon from '../lib/HttpCommon';
//import CrudIndex from './CrudIndex';
//
let pageItems: any[] = [];
const dataItems: any[] = [
  {id:1, title: "title_1"},
  {id:2, title: "title_2"},
  {id:3, title: "title_3"},
];
let items: any[] = [];
//
export function App() {
  const [count, setCount] = useState(0);  
  const [updatetime, setUpdatetime] = useState("");
  //
  useEffect(() => {
    (async() => {
      pageItems = dataItems;
      setUpdatetime(new Date().toString());
    })()
  }, []);
  //
  const addItem = async function(){
    try{
      const title = document.querySelector("#title");
      let titleValue = "";
      //@ts-ignore
      if(title){ titleValue = title.value }
      const addId = pageItems.length + 1;
      pageItems.push({id: addId, title: titleValue});
      setUpdatetime(new Date().toString());
      //@ts-ignore
      title.value = "";
    } catch (e) {
      console.error(e);
    } 
  }
  //
  return (
    <div class="container mx-auto my-2 px-8 bg-white">
      <div>
      </div>
      <h1 class="text-4xl font-bold">Test.tsx</h1>
      <hr class="my-2" />
      <label>Title:</label>
      <input type="text" id="title" 
      class="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
      />
      <div class="card">
        <button class="btn-purple my-1" onClick={() => addItem()}>Save
        </button>
      </div>
      <hr />
      {pageItems.map((item: any) => {
        return (
        <div key={item.id}>
          <h3 class="text-3xl font-bold">{item.title}</h3>
          <span>id: {item.id}</span>
          <a href={`/test/show?id=${item.id}`}>
            <button class="btn-outline-purple ms-2">Show</button>
          </a>
          <hr />
        </div>
        );
      })}
    </div>
  )
}
/*
*/