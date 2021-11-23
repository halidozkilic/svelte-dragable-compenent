<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    let drop_zone;
    let drop_zones = [
        [
            {el: null, id: 1},
            {el: null, id: 2},
            {el: null, id: 3},
        ],
        [
            {el: null, id: 1},
            {el: null, id: 2},
            {el: null, id: 3},
            {el: null, id: 4},
            {el: null, id: 5},
            {el: null, id: 6},
            {el: null, id: 7},
        ],
        [
            {el: null, id: 4},
            {el: null, id: 5},
            {el: null, id: 6},
            {el: null, id: 7},
            {el: null, id: 8},
            {el: null, id: 9},
            {el: null, id: 10},
            {el: null, id: 11},
            {el: null, id: 12},
            {el: null, id: 13}
        ]

    ];

    let objects = [
        {el: null, id: 1},
        {el: null, id: 2},
        {el: null, id: 3},
        {el: null, id: 4},
        {el: null, id: 5},
        {el: null, id: 6},
        {el: null, id: 7},
        {el: null, id: 8},
        {el: null, id: 9},
        {el: null, id: 10},
        {el: null, id: 11},
        {el: null, id: 12},
        {el: null, id: 13}
    ];

    let dropped = [];
    let status = '';

    let dropped_in = '';
    let activeEvent = '';
    let originalX = '';
    let originalY = '';
    let index = 0;

    function handleDragDrop(e, j) {
        if (j != undefined) {
            console.log('var')
            index = j
            drop_zones[index] = drop_zones[index].concat(e.dataTransfer.getData("text"))
            console.log(drop_zones[index])
        }

        let elements = document.elementsFromPoint


        e.preventDefault();
        dropped = dropped.concat(e.dataTransfer.getData("text"));
        console.log(dropped)
        dropped_in = true;


        // const data=e.dataTransfer.getData("text");
        // const nodeCopy = document.getElementById(data).cloneNode(true);
        // nodeCopy.id = "newId";
        // e.target.appendChild(nodeCopy);
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
        className="drop_zone"
        on:drop={handleDragDrop}
        bind:this={drop_zone}
        onDragOver="return false"
>
    {#each drop_zones as lineArr , j}
        <div
                className="lines"
                on:drop={(e) => handleDragDrop(e,j)}
        >
            {#each lineArr as {id} , i}
                <div
                        className="objects"
                >
                    Object { id }
                </div>
            {/each}
        </div>
    {/each}

</div>

<!--element list-->
{#each objects as {id}, i}
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
        user-select: none;
        -webkit-user-select: none;
    }

    .drop_zone {
        background-color: #eee;
        border: #999 1px solid;
        width: auto;
        min-width: 50px;
        min-height: 50px;
        padding: 8px;
        font-size: 19px;
        overflow-x: auto;
        overflow-y: hidden;
    }

    .lines {

        display: grid;
        grid-gap: 16px;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        grid-auto-flow: column;
        grid-auto-columns: minmax(160px, 1fr);
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