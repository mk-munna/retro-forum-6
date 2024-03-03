
// icon tooltip and hover effects
const icon = document.getElementsByClassName('tp');

for (let i = 0; i < icon.length; i++) {
    icon[i].addEventListener('mouseover', function () {
        this.style.transform = 'scale(1.1)';
        this.style.transitionDuration = '0.1s';
        this.children[0].style.visibility = 'visible';
        // console.log(this.children[0]);
    });
    icon[i].addEventListener('mouseout', function () {
        this.style.transform = 'scale(1)';
        this.style.transitionDuration = '0.1s';
        this.children[0].style.visibility = 'hidden';

    });
}
//
// input search scale
document.getElementById('search-input').addEventListener('focus', function () {
    this.style.transform = 'scale(1.05)';
    this.style.transitionDuration = '0.2s';
});
document.getElementById('search-input').addEventListener('blur', function () {
    this.style.transform = 'scale(1)';
    this.style.transitionDuration = '0.2s';
});


const markRead = ()=>{
    let markCount = 0;
    const postDiv = document.querySelectorAll('.post-div');
    postDiv.forEach((post) => {
        const readBtn = post.children[1].childNodes[7].childNodes[4].childNodes[0].childNodes[0];
        readBtn.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.05)';
            this.style.transitionDuration = '0.1s';
        });
        readBtn.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
            this.style.transitionDuration = '0.1s';
        });

        readBtn.onclick = function () {
            markCount++;
            document.getElementById('mark-count').innerText = markCount;
            let viewCount = this.parentNode.parentNode.previousSibling.previousSibling.childNodes[3].innerText;
            // console.log(viewCount);
            viewCount++;
            this.parentNode.parentNode.previousSibling.previousSibling.childNodes[3].childNodes[2].innerHTML = `<span>&nbsp; ${viewCount}</span>`;
            const postTitle = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText;
            // console.log(postTitle);
            readBtn.parentElement.innerHTML = `<i class="fa-solid fa-envelope-open"></i>`
            post.classList.remove('bg-[#797DFC1A]');
            post.classList.add('bg-gray-100');

            const markedDiv = document.getElementById('marked-div');
            const newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'shadow-xl flex gap-4 bg-gray-50 rounded-xl p-3');
            newDiv.innerHTML = `
            <p class="text-base font-semibold">${postTitle}</p>
                            <div class="w-[150px]">
                                <p><i class="text-sm fa-regular fa-eye"></i> <span class="text-sm">  ${viewCount}</span></p>
                            </div>
            `;
            markedDiv.appendChild(newDiv);
        }
    })
}

