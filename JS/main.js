








const icon = document.getElementsByClassName('tp');

for (let i = 0; i < icon.length; i++) {
    icon[i].addEventListener('mouseover', function (event) {
        this.style.transform = "scale(1.1)";
        this.children[0].style.visibility = 'visible';
        // console.log(this.children[0]);
    });
    icon[i].addEventListener('mouseout', function () {
        this.style.transform = "scale(1)";
        this.children[0].style.visibility = 'hidden';
        
    });
}