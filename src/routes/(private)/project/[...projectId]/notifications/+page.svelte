<script>
    export let data;
    let notifs = data.logs || []; 
  </script>
  
  <div class="flex justify-center items-center min-h-screen">
    <!-- Log Panel -->
    <div class="w-520 bg-green-400 bg-opacity-20 border border-gray-300 p-4 rounded-lg">
      <h2 class="text-xl text-green-400 font-semibold mb-2">Log Panel</h2>
      {#if !notifs || notifs.length===0}
      <p class="mb-2 text-white border-b border-white pb-2">
        No notifications found
      </p>
      {:else}
      <ul class="overflow-y-auto max-h-[400px]">
        {#each notifs as log (log)}
          <li class="mb-2 text-white border-b border-white pb-2">
            {JSON.stringify(log)}
          </li>
        {/each}
      </ul>
      {/if}
    </div>
  </div>
  