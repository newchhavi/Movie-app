// let groupImage=[
//     "food5.jpg",
//     "food6.jpg",
//     'food3.jpg'
//     ];

//     let i=0;
//    function slide()
//     {
//       let imag= document.getElementById('imo');
//       imag.src=groupImage[i];
//       if(i<groupImage.length)
//       {
//         i++;
//       }
//       else{
//         i=0
//       }
//     }
//     setInterval(slide,1000);

    //fetch api//
    let copy=[];
    
    let imag1='https://image.tmdb.org/t/p/w1280'
async function Api(current_page)
{
    let data=await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${current_page}`);
    let res= await data.json();
    return res.results;
    // console.log("res",res.results);

}
// Api()

async function display(page)
{
    copy=await Api(page)
    let div1=document.getElementById('container1')
    div1.innerHTML='';
    
   

    copy.map((val)=>{
       console.log("v",val);
       let div2=document.createElement('div');
       div2.setAttribute('class',"con1");
       let imo=document.createElement('img')
       imo.setAttribute("class","im")
        imo.src=imag1+val.poster_path
        
        let div3=document.createElement('div')
        div3.setAttribute('class','con2')

        let h11=document.createElement('h1')
        h11.innerHTML=val.title;

        let p1=document.createElement('span')
        p1.setAttribute('class','span1')
        p1.innerHTML=val.vote_average
        // console.log("div3",div3);


        div3.appendChild(h11)
        div3.appendChild(p1)
        div2.appendChild(imo)
        div2.appendChild(div3)

        div2.appendChild(div3)
        div1.appendChild(div2)
    
       console.log("div1",div2);
    })

    


}
display()
