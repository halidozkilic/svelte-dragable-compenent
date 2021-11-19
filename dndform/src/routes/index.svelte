<script>
    let drop_zone;
    let drop_zones = [];

    let objects = [
        { el: null, id: 1 },
        { el: null, id: 2 },
        { el: null, id: 3 },
        { el: null, id: 4 },
        { el: null, id: 5 },
        { el: null, id: 6 },
        { el: null, id: 7 },
        { el: null, id: 8 },
        { el: null, id: 9 },
        { el: null, id: 10 },
        { el: null, id: 11 },
        { el: null, id: 12 },
        { el: null, id: 13 }
    ];

    let dropped = [];
    let status = '';

    let dropped_in = '';
    let activeEvent = '';
    let originalX = '';
    let originalY = '';


    function handleDragDrop(e) {
        e.preventDefault();
        dropped = dropped.concat(e.dataTransfer.getData("text"));
        console.log('basarili')

        dropped_in = true;
        const data=e.dataTransfer.getData("text");
        /* If you use DOM manipulation functions, their default behaviour it not to
           copy but to alter and move elements. By appending a ".cloneNode(true)",
           you will not move the original element, but create a copy. */
        const nodeCopy = document.getElementById(data).cloneNode(true);
        nodeCopy.id = "newId"; /* We cannot use the same ID */
        e.target.appendChild(nodeCopy);
    }

    function handleDragStart(e) {
        e.dataTransfer.dropEffect = "move";
        // e.dataTransfer.setData("text", e.target.getAttribute('id'));

        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.effectAllowed = "copy";
    }

    function handleDragEnd(e) {
        if (dropped_in == false) {
            console.log('deneme')
        }
        dropped_in = false;
    }


</script>


<!--drop zone-->
<div
        on:drop={handleDragDrop}
        bind:this={drop_zone}
        id="drop_zone"
        ondragover="return false"
>
</div>


<!--element list-->
{#each objects as { id }, i}
    <div
            id="{id}"
            class="objects"
            draggable=true
            bind:this={objects[i].el}
            on:dragstart={handleDragStart}
            on:dragend={handleDragEnd}
    >
        Object { id }
    </div>
{/each}

<style>
    :global(html), :global(body) {
        margin: 0;
        height: 100%;
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none;
    }

    #drop_zone {
        background-color: #eee;
        border: #999 1px solid ;
        width: auto;
        height: auto;
        min-width:50px;
        min-height:100px;
        padding: 8px;
        font-size: 19px;
    }

    .objects {
        display: inline-block;
        background-color: #FFF3CC;
        border: #DFBC6A 1px solid;
        width: 50px;
        height: 50px;
        margin: 10px;
        padding: 8px;
        font-size: 18px;
        text-align: center;
        box-shadow: 2px 2px 2px #999;
        cursor: move;
        margin-bottom: 33px;
    }

    .droppedElements {

        background-color: #FFF3CC;
        border: #DFBC6A 1px solid;
        width: 50px;
        height: 50px;
        margin: 10px;
        padding: 8px;
        font-size: 18px;
        text-align: center;
        box-shadow: 2px 2px 2px #999;
        margin-bottom: 22px;
    }
</style>