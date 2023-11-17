import "./App.css";
import React from 'react'


function Arama({aramaMetni,onSearch}) {
  function handleChange(event){
    console.log(event);
    onSearch(event); 
  };
  return (
    <div>
      <label htmlFor="arama">Ara: </label>
      <input id="arama" type="text" onChange={handleChange}
       value={aramaMetni}/>
     
    
    </div>
  );
}
function Yazi({url,baslik,yazar,yorum_sayisi,puan,id}){
  return(
    <li key={id}>
    <span>
      <a href={url}>{baslik}</a>,
    </span>
    <span>
      <b>Yazar:</b> {yazar},{" "}
    </span>
    <span>
      <b>Yorum Sayısı:</b> {yorum_sayisi},{" "}
    </span>
    <span>
      <b>Puan:</b> {puan}
    </span>
  </li>
  )
}
function Liste(props) {
  return (
    <ul>
      {props.yazilar.map(function (yazi) {
        return (
        <Yazi key={yazi.id} {...yazi}/>
        );
      })}{" "}
    </ul>
  );
}
function App() {
  const [aramaMetni,setAramaMetni] =React.useState(localStorage.getItem("aranan") || "React");

  const yaziListesi = [
    {
      baslik: "React Öğreniyorum",
      url: "www.sdu.edu.tr",
      yazar: "Sinan Yüksel",
      yorum_sayisi: 3,
      puan: 4,
      id: 0,
    },
    {
      baslik: "Web Teknolojileri ve Programlama",
      url: "wwww.google.com.tr",
      yazar: "Asım Yüksel",
      yorum_sayisi: 2,
      puan: 5,
      id: 1,
    },
  ];

  
const arananYazilar = yaziListesi.filter(function (yazi) {
  return (
    yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    yazi.yazar.toLowerCase().includes(aramaMetni.toLowerCase())
  );
});

  React.useEffect(() => {
    localStorage.setItem("aranan",aramaMetni);
  },[aramaMetni]);


  //1. aşama callback handler metodu oluşturma
function handleSearch(event){
  console.log(event.target.value);
  localStorage.setItem("aranan", event.target.value);
}

  return (
    <>
      <h1>Yazılar</h1>
      <Arama aramaMetni={aramaMetni} onSearch={handleSearch} />  
      <p>
        <strong>{aramaMetni} aranıyor..</strong>
      </p>
      <hr />
      <Liste yazilar={arananYazilar}/>
    </>
  );
}
export default App;