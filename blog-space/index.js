let postsArray = []
const titleInput = document.getElementById("post-title")
const infoInput = document.getElementById("post-info")
const form = document.getElementById("new-post")
const blogList = document.getElementById("blog-list")

function render() {
    let html = ''
    for (let post of postsArray){
        html += `
            <div>
                <h2> ${post.title} </h2>
                <p> ${post.body} </p>
            </div>
            <hr />
        `
    }
    blogList.innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        render()
    })
form.addEventListener("submit", function(e) {
    e.preventDefault()
    const postTitle = titleInput.value 
    const postInfo = infoInput.value
    const newPost = {
        title: postTitle, 
        body: postInfo
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST", 
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(data => {
        postsArray.unshift(data)
        render()
        form.reset()
    })
})