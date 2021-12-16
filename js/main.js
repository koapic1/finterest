function showCursorInfo() {
    console.log(e.clientY);
    console.log(e.pageY);
    console.log(e.offsetY);
    console.log(e.screenY);
    $("input[name='clientY']").val(e.clientY);
    $("input[name='pageY']").val(e.pageY);
    $("input[name='offsetY']").val(e.offsetY);
    $("input[name='screenY']").val(e.screenY);
}

const cursor = $(".cursor");
$(window).on("mousemove", function (e) {
    //showCursorInfo();
    gsap.to(cursor, { left: e.clientX, top: e.clientY });
});

const itemListUL = $("#works .itemList");

let grid = null;

$.ajax({
    url: "../data/typo.json",
    success: function (res) {
        //console.log(res);
        const itemList = res.typoList;
        let output = "";
        $.each(itemList, function (idx, item) {
            output += `
            <li class="item ${item.category}">
                <a href="../images/${item.img}" data-fancybox="${item.category}" data-caption="${item.title}">
                    <div class="img">
                            <img src="../images/${item.img}" alt="" />
                    </div>
                    <div class="info">
                        <h2>${item.title}</h2>
                        <p class="desc">${item.desc}</p>
                        <p class="point">
                            <span>${item.point}</span>
                        </p>
                    </div>
                </a>
            </li>
            `;
        });
        itemListUL.html(output);
        Fancybox.bind("[data-fancybox]");
        $(".itemList").imagesLoaded(function () {
            grid = $(".itemList").isotope({
                // options
                itemSelector: ".item",
                layoutMode: "masonry",
                getSortData: {
                    point: ".point parseFloat",
                    title: ".title",
                },
            });
        });
    },
});

$("#filter li").on("mouseenter", function () {
    gsap.killTweensOf(".cursor");
    $(".cursor .txt").text("CLICK");
    gsap.to(".cursor", {
        width: 80,
        height: 80,
        backgroundColor: "#c92a2a",
        ease: "elastic",
        duration: 1,
    });
});
$("#filter li").on("mouseleave", function () {
    gsap.killTweensOf(".cursor");
    $(".cursor .txt").text("");
    gsap.to(".cursor", {
        width: 10,
        height: 10,
        backgroundColor: "#fff",
        ease: "power4",
        duration: 0.2,
    });
});

$(".itemList").on("mouseenter", "li", function () {
    gsap.killTweensOf(".cursor");
    $(".cursor .txt").text("VIEW");
    gsap.to(".cursor", {
        width: 80,
        height: 80,
        backgroundColor: "#1971ce",
        ease: "elastic",
        duration: 1,
    });
});
$(".itemList").on("mouseleave", "li", function () {
    gsap.killTweensOf(".cursor");
    $(".cursor .txt").text("");
    gsap.to(".cursor", {
        width: 10,
        height: 10,
        backgroundColor: "#fff",
        ease: "power4",
        duration: 0.2,
    });
});

$("#filter li").on("click", function () {
    if ($(this).hasClass("on")) return;
    $(this).addClass("on").siblings("li").removeClass("on");
    const _filter = $(this).data("filter");
    grid.isotope({
        filter: `.${_filter}`,
        sortBy: ["point", "title"],
        sortAscending: false,
    });
});
