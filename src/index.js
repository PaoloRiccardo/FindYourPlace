const bottone = document.getElementById('searchButton');

bottone.addEventListener('click', function(){
    
    
    document.getElementById("categorie").innerHTML = "";
    document.getElementById("sommario").innerHTML = "";
    animationSubtitle ();
    let input = document.getElementById('city');
    let valore = input.value;
    valore = valore.toLowerCase();
    valore = valore.replace(' ','-');

    if (valore != "") {
        
            async function getData() {
            const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${valore}/scores/`);                     
            const text = await response.json();  
            try {               
            const categories = _.get(text, "text.categories", "");
            const summary = _.get(text, "text.summary", "");            
            text.categories.forEach((e,i)=>{
                const elem = document.createElement("div");
                elem.id = `cat${i}`;
                elem.textContent = `${e.name}: ${(e.score_out_of_10).toFixed(1)}`;
                elem.setAttribute("class", "modificastile");
                document.getElementById('categorie').appendChild(elem);
            })
            sommario.insertAdjacentHTML("afterbegin", text.summary);
            sommario.setAttribute("class", "modificaParagrafo");
            console.log(categories);
            console.log(summary);
        } catch {
            subtitle.style.display ="none";
            const elem = document.createElement("div");
            elem.textContent = `Entered city not listed or enter name in English, please try again`;
            elem.setAttribute("class", "error");
            document.getElementById('categorie').appendChild(elem);
            
        }
        }
        getData();  
    } 
})

function animationSubtitle (){
    let subtitle = document.getElementById("subtitle") 
    subtitle.style.display = "block";
 }   




document.getElementById("city").addEventListener('keyup', function(event){
    event.preventDefault(); 
    if (event.key === 'Enter') {
         document.getElementById("searchButton").click(); 
        } 
    }); 

