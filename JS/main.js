

const getData = async (url) => {
    loaderOn()
    const response = await fetch(url);
    const data = await response.json();
    const posts = data.posts;
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
            loaderOff(); 
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
                loaderOff();
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
        latestPostContainer.appendChild(newDiv);
    }))
}



getLatestPosts()

// loader
function loaderOn() {
    document.getElementById('loader').classList.remove('hidden');
}

function loaderOff() {
    document.getElementById('loader').classList.add('hidden');
}

