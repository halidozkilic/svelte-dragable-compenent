<script>
    let dragCount = 0
    let status = '';
    let dragData;
    let hoveredItem;
    let leftAway;
    let topAway;
    let dragItems = [
        {
            id:1,
            title:'Drag Item 1',
            color:'brown'
        },
        {
            id:2,
            title:'Drag Item 2',
            color:'green'
        },        {
            id:3,
            title:'Drag Item 3',
            color:'pink'
        },
        {
            id:4 ,
            title:'Drag Item 4',
            color:'grey'
        }
    ]

    let dropZoneItems = [
        [
              {
                    id:13,
                    title:'blue',
                    color:'blue'
              },
              // {
              //       id:14,
              //       title:'green',
              //       color:'green'
              // },
        ],
        [
            {
                id:5,
                title:'yellow',
                color:'yellow'
            },
            // {
            //     id:6,
            //     title:'orange',
            //     color:'orange'
            // },
            // {
            //     id:7,
            //     title:'blue',
            //     color:'blue'
            // }
        ],
        [
            {
                id:8,
                title:'green',
                color:'green'
            }
        ],
        [
            {
                id:9,
                title:'yellow',
                color:'yellow'
            },
            {
                id:10,
                title:'blue',
                color:'blue'
            },
            {
                id:11,
                title:'orange',
                color:'orange'
            },
            {
                id:12,
                title:'red',
                color:'red'
            }
        ],
    ]

    function pdown(ev) {
        ev.preventDefault()
        status = 'moving';
        const clone = ev.target.cloneNode(true);

        clone.style.width = "200px";
        clone.style.position = "absolute";
        clone.style.opacity = 0.3
        const item = dragItems.find(o=> o.id === Number(ev.target.getAttribute('data-id')))
        dragData = {
            clone,
            item: item
        };

        window.addEventListener('pointermove',pMove);
        window.addEventListener('pointerup',pUp);
    }

    function pUp(ev) {
        window.removeEventListener('pointermove',pMove);
        window.removeEventListener('pointerup',pUp);
        if(status==='add'){
            console.log(dragData)
            dragData.Inline != undefined ?  dropZoneItems[dragData.line].splice(dragData.Inline, 0, dragData.item)
            : dropZoneItems.splice(dragData.line, 0, [dragData.item]);

            dropZoneItems = dropZoneItems
        }
        dragData.clone.remove()
        dragData = null
    }

    function pMove(ev){
        if(!dragData.clone.parentNode){
            document.body.appendChild(dragData.clone)
        }

        dragData.clone.style.left = (ev.clientX - dragData.clone.offsetWidth/2) + "px";
        dragData.clone.style.top =  (ev.clientY - dragData.clone.offsetHeight/2)+ "px";

        const elements = document.elementsFromPoint(ev.clientX,ev.clientY);
        let underElement = elements[1].getBoundingClientRect();
        let left = ev.clientX - underElement.left; //x position within the element.
        let top = ev.clientY - underElement.top;  //y position within the element.
       //console.log(elements)
        //dropping exist line
        if(elements[1] && elements[1].classList.contains('field')){
            status = 'add'
            console.log(elements)
            if(left < elements[1].offsetWidth/4 || left > elements[1].offsetWidth*3/4){
             calculateInlineDrop(elements,left)
             dragData.line = elements[2].classList.contains('field') ? Number(elements[3].id) : Number(elements[2].id)
            }
            else{
                calculateLineDrop(elements,top)
            }
        }
        //dropping new line (could be top or bottom)
        else if(elements[1] && elements[1].classList.contains('zone')){
            status = 'first'
        }
        //out side of drop zone
        else {
            status = 'delete'
        }
    }

    function calculateLineDrop(elements,top){
            delete dragData.Inline
            dragData.line = top > elements[2].offsetHeight/2 ? Number(elements[2].id) + 1
            : elements[2].classList.contains('field') ? Number(elements[3].id) : Number(elements[2].id)
    }

    function calculateInlineDrop(elements,left){
            dragData.Inline = left > elements[1].offsetWidth/2 ? Number(elements[1].id) + 1
            : elements[2].classList.contains('field') ? Number(elements[2].id) : Number(elements[1].id)
    }

</script>

<!--drop zone-->
<div
        class="zone"
>
    {#each dropZoneItems as lines, j }
    <div
            class="lines"
            id={j}
    >
        {#each lines as items, i }
        <div
                class="cells field"
                style="background-color: {items.color}"
                id={i}
        >
        {items.title}
        </div>
        {/each}
    </div>
    {/each}
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
        height: 40px;
    }
    .cells{
        border:  1px solid;
        width: 100%;
    }
    .zone {
        background-color: #eee;
        border: #999 1px solid;
        width: 100%;
        height: 300px;
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