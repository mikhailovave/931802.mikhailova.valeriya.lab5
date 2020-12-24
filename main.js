class News{
    constructor(news){
        if(news.length){
            this.getNewId = this._createIdGenerator();
            this._drawer = new Drawer;
            this._news = news.map(n => {
                return {
                    id : this.getNewId(),
                    title: n.title,
                    text: n.text
                }
            })
        }else console.error("array not found")
    }

    _createIdGenerator = () => {
        let id = 1;
        return () => id++;
    }

    open = (id) => 
    {
        let currentNew = this._news.find(n => n.id === id);
        let html = `
            <div class="drawer_new">
                <div class="drawer_title" >
                    <h4>
                        ${currentNew.title}
                    </h4>
                </div>

                <div class="drawer_text" >
                    ${currentNew.title + ": " + currentNew.text}
                </div>
            </div>
        `;
        this._drawer.show(html);
    }

    getHtml = () => this._news.map(n => `
        <div class="new">
            <div class="title">
                <h4>${n.title}</h4>
            </div>

            <div class="text">
                ${n.text}
            </div>

            <div class="action">
                <button onclick="news.open(${n.id})">Открыть всплывающее окно</button>
            </div>
        </div>
    `).join('')

    addNew = (n) => 
    {
        this._news.push(
            {
            id : this.getNewId(),
            title: n.title,
            text: n.text
        })
    }

    deleteNew = (id) =>  this._news = this._news.filter(n => n.id !== id)
    getNews = () => this._news
}

class Drawer {
    constructor(){
        this._body = document.querySelector('body');
        this._body.innerHTML += `<div class="drawer hide"></div>`
    }

    show = (html) => {
        let drawer = document.querySelector(".drawer");
        drawer.innerHTML = html;
        drawer.classList.remove("hide");
        document.addEventListener('click', (e) => {
            if(e.target.classList[0] === "drawer") this.hide(drawer);
        })
    }
    
    hide = (drawer) => drawer.classList.add("hide");
}

let NewsArray = 
[
    {title:"Новость 1", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam hic, ipsa, ullam, cupiditate eveniet at voluptate corrupti commodi nobis ratione voluptatem! Vel animi totam cupiditate doloribus ad ab exercitationem officia eveniet impedit? Deleniti quasi nisi consectetur perspiciatis quibusdam nostrum, enim perferendis nam, magni molestias recusandae id libero vitae, repudiandae praesentium."},
    {title:"Новость 2", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam hic, ipsa, ullam, cupiditate eveniet at voluptate corrupti commodi nobis ratione voluptatem! Vel animi totam cupiditate doloribus ad ab exercitationem officia eveniet impedit? Deleniti quasi nisi consectetur perspiciatis quibusdam nostrum, enim perferendis nam, magni molestias recusandae id libero vitae, repudiandae praesentium."},
    {title:"Новость 3", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam hic, ipsa, ullam, cupiditate eveniet at voluptate corrupti commodi nobis ratione voluptatem! Vel animi totam cupiditate doloribus ad ab exercitationem officia eveniet impedit? Deleniti quasi nisi consectetur perspiciatis quibusdam nostrum, enim perferendis nam, magni molestias recusandae id libero vitae, repudiandae praesentium."}
]

let news = new News(NewsArray);
document.querySelector(".news").innerHTML = news.getHtml();