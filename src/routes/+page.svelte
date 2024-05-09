<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ accounts } = data);

    let id: number
    let user: string
    let money: number
    let mode: string
    let qty: number

    let cardView = true
</script>

<div class="container">
	<div class="funcs">
        <div class="users">
                <div class="top">
                    <h2 class="title list">Users</h2>
                    <label for="" class="view">View mode: <button class="view-btn" on:click={() => cardView = !cardView}>{cardView ? 'Cards' : 'List'}</button></label>
                </div>
                <div class="user-list">
                    
                    {#if accounts.length !== 0}
                            {#if cardView}
                                {#each accounts as account}
                                    <div class="user">
                                        <p>Nome: {account.user} - Soldi: {account.money}</p>
                                    
                                        <div class="actions">
                                            <div class="forms">
                                                <form action="">
                                                    <button type="submit" class="btn edit" on:click={() => {id = account.id; user = account.user; money = account.money}}>Modifica</button>
                                                </form>
                                                <form action="?/deleteUser&id={account.id}" method="POST">
                                                    <button type="submit" class="btn delete" >Elimina</button>
                                                </form>
                                            </div>
                                            <p class="id">ID: {account.id}</p>
                                        </div>
                                    </div>
                                {/each}
                            {:else}
                                <ul>
                                    {#each accounts as account}
                                            <li>Nome: {account.user} - Soldi: {account.money}</li>
                                    {/each}
                                </ul>
                            {/if}
                    {:else}
                        <div class="no-user">
                            <p>Nessun utente presente</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
        <div class="user-funcs">
            <form action="?/createUser" method="POST" class="new-user">
                <h2 class="title new">New User</h2>
                <div class="inputs">
                        <div class="input">
                            <label for="user"> Nome </label>
                            <input type="text" id="user" name="user" />
                        </div>
                        <div class="input">
                            <label for="user"> Soldi </label>
                            <input type="number" id="money" name="money" />
                        </div>
                        <button type="submit">Aggiungi Utente</button>
                    </div>
            </form>
            <form action="?/updateUser&id={id}&money={money}&qty={qty}&mode={mode}" method="POST">
                <h2>Edit User</h2>
                <div class="inputs">
                    <div class="input">
                        <label for="user"> ID </label>
                        <input type="text" id="id" name="id" required bind:value={id} />
                    </div>
                    <div class="input">
                        <label for="mode"> Modalità </label>
                        <select name="mode" id="mode" required bind:value={mode}>
                            <option value="add">Aggiungi</option>
                            <option value="remove">Rimuovi</option>
                            <option value="set">Imposta</option>
                        </select>
                    </div>
                    <div class="input">
                        <label for="user"> Soldi </label>
                        <input type="number" id="qty" name="qty" required bind:value={qty} />
                    </div>
                    <button type="submit">Modifica Utente</button>
                </div>
            </form>
        </div>
</div>

<style>
    * {
        margin: 10px 0;
    }

    .container {
        display: flex;
        justify-content: center;
    }

    .funcs {
        display: flex;
        justify-content: space-around;
        margin: 8px;
        padding: 5px;
        border: 1px solid rgb(54, 54, 54);
        border-radius: 10px;
        width: max-content;
    }

    .funcs > * {
        margin: 8px;
    }

    .top {
        display: flex;
        justify-content: space-between;
    }

    .user-list {
        width: 55vw;
    }

    .view {
        margin: 0;
    }

    .view-btn {
        border: 1px solid;
        border-radius: 10px;
        width: 3.6rem;
        margin-left: 0.5rem;
    }

    .user {
        width: 50vw;
        padding: 8px;
        margin: 30px 20px;
        border: 1px solid rgb(54, 54, 54);
        border-radius: 10px;
    }

    .user > p {
        font-weight: 500;
        text-decoration: none;
    }

    .no-user {
        margin: 30px 20px;
        width: 50vw;
    }

    .user > * {
        margin-left: 20px;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        /* border: 1px solid rgb(54, 54, 54); */
    }

    .forms {
        display: flex;
    }

    .btn.edit {
        border: 1px solid rgb(80, 106, 255);
        margin: 0 10px 0 0px;
    }

    .btn.delete {
        border: 1px solid rgb(255, 80, 80);
        margin: 0 10px 0 10px;
    }

    .id {
        float: right;
    }

    .actions > * {
        margin: 0 20px 0 0;
    }

    .user-list {
        margin: 30px 0;
    }

    .inputs {
        margin: 0 40px;
    }

    .new-user {
        float: right;
    }

    button {
        padding: 7px;
        background-color: transparent;
        border: 1px solid white;
        border-radius: 20px;
    }

    button:hover {
        background-color: #2b2b2b;
        cursor: pointer;
    }

    input {
        background-color: transparent;
        border: 1px solid white;
        border-radius: 20px;
        margin: 5px 0 10px 10px;
    }

    select {
        background-color: transparent;
        border: 1px solid white;
        border-radius: 20px;
        margin: 5px 0 10px 10px;
    }

    option {
        background-color: #2b2b2b;
    }

    .title.new {
        margin-top: 20px;
    }
</style>
