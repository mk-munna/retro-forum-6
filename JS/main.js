const loader1CReate = (loopNumber) => {
    const getLoaderDiv = document.getElementById('loader');
    getLoaderDiv.innerHTML='';
    for (let i = 0; i < loopNumber; i++) {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'p-4 lg:p-10 bg-gray-300 rounded-3xl');
        newDiv.innerHTML = `
        <div class="flex gap-6">
                                <div class="w-[70px] h-[70px] bg-gray-400 rounded-md"></div>
                                <div class="text-sm w-3/4">
                                    <span class="bg-gray-400 h-4 block mb-2 w-1/2"></span>
                                    <span class="bg-gray-400 h-4 block"></span>
                                </div>
                            </div>
                            <div class="text-base font-semibold text-gray-400 mt-4 space-y-3">
                                <span class="bg-gray-400 h-6 w-3/4 block mb-2"></span>
                                <span class="bg-gray-400 h-4 w-1/4 block"></span>
                            </div>
        `
    getLoaderDiv.appendChild(newDiv)
    }
}
const getData = async (url) => {
    loader1On()
    const response = await fetch(url);
    const data = await response.json();
    const posts = data.posts;
    // console.log(posts.length);
    if (posts.length === 0) {
        loader1CReate(1)
    } else {
        loader1CReate(posts.length)
    }
    displayData(posts);
    
    // console.log(url);
    // console.log(data.posts);
};

const noData = document.getElementById('no-data');
const postDivContainer = document.getElementById('post-div-container');

getData(`https://openapi.programming-hero.com/api/retro-forum/posts`);//default data displaying
const displayData = (posts) => {
    if (posts.length === 0) {
        setTimeout(() => {
            loader1Off(); 
            noData.classList.remove('hidden');
            noData.classList.add('flex')
        }, 2000);
    } else {
        noData.classList.remove('flex');
        noData.classList.add('hidden');
    }
    posts.forEach(post => {
        // console.log(post);
        if (post.isActive) {
            const active = 'bg-green-700 '
            createPost(active, post);
            // console.log(posts);
        } else {
            const inactive = 'bg-red-200 '
            createPost(inactive, post);
        }
        function createPost(isActive, post) {
            const postDiv = document.createElement('div');
            postDiv.setAttribute('class', 'post-div p-4 lg:p-10 bg-[#797DFC1A] rounded-3xl');
            postDiv.innerHTML = `
        <div class="flex gap-6">
                            <div class="w-[70px] h-[70px] relative">
                                <div class="w-[12px] ${isActive} h-[12px] rounded-full absolute -right-1 -top-1"></div>
                                <img class="rounded-md"
                                    src="${post?.image || 'not found 😌'}"
                                    alt="">
                            </div>
                            <div class="text-sm"><span>#${post?.category}</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Author : ${post?.author?.name || 'not found  😌'}</span>
                            </div>

                        </div>
                        <div class=" text-base font-semibold text-[#12132DCC] lg:ml-[90px] lg:-mt-[40px] space-y-3">

                            <h1 class="text-xl post-title font-bold">${post?.title || 'not found 😌'}</h1>
                            <p>${post?.description || 'not found 😌'}</p>
                            <hr>
                            <div class="flex justify-between"><!--last icon container-->
                                <div class="gap-6 lg:gap-12 text-gray-500 flex">
                                    <p><i class="fa-regular fa-comment-dots"></i> <span> &nbsp; ${post?.comment_count || 'not found 😌'}</span></p>
                                    <p><i class="fa-regular fa-eye"></i> <span> &nbsp; ${post?.view_count || 'not found 😌'}</span></p>
                                    <p><i class="fa-regular fa-clock"></i> <span> &nbsp; ${post?.posted_time || 'not found 😌'}</span></p>
                                </div>
                    <div class="bg-green-500 text-white px-2 py-1 rounded-full"><button class="read" ><i class="fa-solid fa-envelope"></i></button></div>
                            </div>
                        </div>`;
            // console.log(postDiv);
            // console.log(post);
            setTimeout(() => {
                loader1Off();
                postDivContainer.appendChild(postDiv);
                markRead();
            }, 2000);
        }
    });
}


document.getElementById('search-button').addEventListener('click', function () {
    const searchInputText = document.getElementById('search-input').value;
    const postDivContainer = document.getElementById('post-div-container');

    noData.classList.remove('flex');
    noData.classList.add('hidden');
    postDivContainer.textContent = ''
    const searchUrl = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchInputText}`
    getData(searchUrl);
})

const getLatestPosts = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await response.json();
    const posts = data;
    displayLatestPosts(posts);
}
function displayLatestPosts(posts) {
    loader2On()
    const latestPostContainer = document.getElementById('latest-post-container');
    posts.forEach((post => {
        // console.log(post);
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'p-6 border solid rounded-2xl space-y-3');
        newDiv.innerHTML = `
        <img class="rounded-2xl"
                        src="${post?.cover_image || 'No Image'}"
                        alt="">
                    <p><i class="fa-regular fa-calendar-check text-sm"></i> <span> &nbsp;${post?.author?.posted_date || 'No Publish Date'}</span></p>
                    <p class="font-extrabold text-lg">${post.title}
                    </p>
                    <p class="text-base">${post.description}</p>
                    <!-- author -->
                    <div class=" flex gap-4">
                        <div class="w-[70px] h-[70px] "><img class="rounded-full"
                                src="${post.profile_image}"
                                alt=""></div>
                        <div>
                            <h1 class="text-base font-extrabold">${post.author.name}</h1>
                            <h1 class="text-sm">${post?.author?.designation || 'Unknown'}</h1>
                        </div>
                    </div>
        `;

        setTimeout(() => {
            loader2Off();
            latestPostContainer.appendChild(newDiv);
        }, 2000);
    }))
}



getLatestPosts()

// loader 1
function loader1On() {
    document.getElementById('loader').classList.remove('hidden');
}

function loader1Off() {
    document.getElementById('loader').classList.add('hidden');
}
// loader 2
function loader2On() {
    document.getElementById('loader-2').classList.remove('hidden');
}

function loader2Off() {
    document.getElementById('loader-2').classList.add('hidden');
}
