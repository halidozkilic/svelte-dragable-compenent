<script>
    let dragCount = 0
    let status = ''
    let dragData;
    let hoveredItem;

    let dragItems = [
        {
            id:1,
            title:'Drag Item 1',
            color:'red'
        },
        {
            id:2,
            title:'Drag Item 2',
            color:'green'
        },
        {
            id:3 ,
            title:'Drag Item 3',
            color:'blue'
        }
    ]

    function pdown(ev) {
        ev.preventDefault()
        status = 'moving';
        const clone = ev.target.cloneNode(true);

        // clone.style.left = (ev.clientX-clone.offsetWidth/2) + "px";
        // clone.style.top =  (ev.clientY-clone.offsetHeight/2)+ "px"
        clone.style.width = "200px";
        clone.style.position = "absolute"

        dragData = {
            clone,
            itemId: Number(ev.target.getAttribute('data-id'))
        };

        //document.body.appendChild(clone);
        window.addEventListener('pointermove',pMove);
        window.addEventListener('pointerup',pUp);
    }

    function pUp(ev) {
        window.removeEventListener('pointermove',pMove);
        window.removeEventListener('pointerup',pUp);
        status = 'dropped'

        dragData.clone.remove()
        dragData = null
    }

    function pMove(ev){
        if(!dragData.clone.parentNode){
            document.body.appendChild(dragData.clone)
        }

        dragData.clone.style.left = (ev.clientX - dragData.clone.offsetWidth/2) + "px";
        dragData.clone.style.top =  (ev.clientY - dragData.clone.offsetHeight/2)+ "px";

        const itemId = dragData.itemId
        const item = dragItems.find(o=> o.id === itemId)

        const elements = document.elementsFromPoint(ev.clientX,ev.clientY);
        if(elements[1] && elements[1].classList.contains('field')){
            elements[1].setAttribute('highlight','1');

        }


    }

</script>

<!--drop zone-->
<div
        class="zone"
>
    <div
            class="lines"
            id="1"
    >
        <div class="cells field" style="background-color: blue" highlight="1">mavi</div>
        <div class="cells field" style="background-color: green">yesil</div>
    </div>

    <div
            class="lines"
            id="2"
    >
        <div class="cells field" style="background-color: yellow">sari</div>
        <div class="cells field" style="background-color: orange">turuncu</div>
        <div class="cells field" style="background-color: blue">mavi</div>
    </div>

    <div
            class="lines"
            id="3"
    >
        <div class="cells field" style="background-color: green">yesil</div>
    </div>

    <div
            class="lines"
            id="4"
    >
        <div class="cells field" style="background-color: yellow">sari</div>
        <div class="cells field" style="background-color: blue">mavi</div>
        <div class="cells field" style="background-color: orange">turuncu</div>
        <div class="cells field" style="background-color: red">kirmizi</div>
    </div>
</div>

<div class="drag-list" id="dragList">
    {#each dragItems as item }
    <div
            class="cells"
            draggable="true"
            on:dragstart={pdown}
            data-id="{item.id}"
            style="background-color: {item.color};"
    >
        {item.title}
    </div>
        {/each}
</div>



<style>
    :global(html), :global(body) {
        margin: 0;
        height: 100%;
        user-select: none;
        -webkit-user-select: none;
    }
    .lines{
        font-size: 19px;
        display: flex;
        text-align: center;

    }
    .cells{
        border:  1px solid;
        width: 100%;
    }
    .zone {
        background-color: #eee;
        border: #999 1px solid;
        width: 100%;
        height: 100%;
        margin-bottom: 50px;
    }

    .drag-list{
        border:1px solid;
        width: 200px;
    }

    .field[highlight="1"] {
        border: 1px solid white;
    }

</style>