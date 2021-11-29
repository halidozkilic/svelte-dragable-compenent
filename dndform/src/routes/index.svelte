<script>
    let
    status = '', dragData, hoveredItem, leftAway, topAway,  dragCount = 0,
        previewData

    let placeholder;

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
            {
                id:6,
                title:'orange',
                color:'orange'
            },
            {
                id:7,
                title:'blue',
                color:'blue'
            }
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
       previewData = {
           last:''
       }

        window.addEventListener('pointermove',pMove);
        window.addEventListener('pointerup',pUp);
    }

    function addNewCell(item,type){
        dragData.Inline != undefined ?  dropZoneItems[dragData.line].splice(dragData.Inline, 0, item)
            : dropZoneItems.splice(dragData.line, 0, [item]);
        dropZoneItems = dropZoneItems
    }

    function removePlaceHolderKey(){
        dropZoneItems.map(lines => lines.map(cells => delete cells.placeholder))
    }

    function removeCell(){
        document.querySelectorAll(('[data-placeholder=true]'))
            .forEach((element) => element.dataset.placeholder = false);
        if(dragData.line != undefined){
             dragData.Inline != undefined ?  dropZoneItems[dragData.line].splice(dragData.Inline, 1)
             : dropZoneItems.splice(dragData.line, 1);
             dropZoneItems = dropZoneItems
        }
    }

    function pUp(ev) {
        window.removeEventListener('pointermove',pMove);
        window.removeEventListener('pointerup',pUp);
        removePlaceHolderKey()

        dragData.clone.remove()
        dragData = null
    }

    function pMove(ev){
        if (!dragData.clone.parentNode) {
            document.body.appendChild(dragData.clone)
        }

        dragData.clone.style.left = (ev.clientX - dragData.clone.offsetWidth/2) + "px";
        dragData.clone.style.top =  (ev.clientY - dragData.clone.offsetHeight/2)+ "px";

        const elements = document.elementsFromPoint(ev.clientX,ev.clientY);
        let underElement = elements[1].getBoundingClientRect();
        let left = ev.clientX - underElement.left; //x position within the element.
        let top = ev.clientY - underElement.top;  //y position within the element.

        //delete placeholder
        if (placeholder && elements[1] && !elements[1].getAttribute('data-placeholder')) {// yada ilk geldigim elemanda degilse left ve bottom icin ayirmak gerekebilir.
            removeCell()
            placeholder = null
            return;
        }

        //dropping exist line
        if (elements[1] && elements[1].classList.contains('field') && !placeholder){
            status = 'add'
            if(left < elements[1].offsetWidth/4 || left > elements[1].offsetWidth*3/4){
             calculateInlineDrop(elements,left)
             dragData.line = elements[2].classList.contains('field') ? Number(elements[3].id) : Number(elements[2].id)
            }
            else{
                calculateLineDrop(elements,top)
            }

            if(previewData.line != dragData.line || previewData.Inline != dragData.Inline){
                console.log('changed')
            }

            previewData.line = dragData.line
            previewData.Inline = dragData.Inline

           // elements[1].dataset.placeholder = true;
            placeholder = {
                ...dragData.item,
                placeholder: true,
            }

            addNewCell(placeholder)
        }
        //dropping first element
        else if (elements[1] && elements[1].classList.contains('zone')){
            status = 'first'
        }
        //out side of drop zone

        console.log(status)
    }

    function calculateLineDrop(elements,top){
        delete dragData.Inline
        if (top > elements[2].offsetHeight/2) {
              dragData.line = Number(elements[2].id) + 1
        }
        else {
            dragData.line = elements[2].classList.contains('field') ? Number(elements[3].id) : Number(elements[2].id)
        }
    }

    function calculateInlineDrop(elements,left){
        if ( left > elements[1].offsetWidth/2){
            dragData.Inline = Number(elements[1].id) + 1
        }
        else {
            dragData.Inline = elements[2].classList.contains('field') ? Number(elements[2].id) : Number(elements[1].id)
        }
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
                data-placeholder="{items.placeholder}"
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
        height: auto;
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