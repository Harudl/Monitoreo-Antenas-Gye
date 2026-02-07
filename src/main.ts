import DataTable from 'datatables.net-dt';
import { apiGetAntennas } from './api/antennas.api';
import './style.css'
import type { Antena } from './types/antenna.type'
import { hideAntennaLocation, initMap, showAntennaLocation } from './map/map';


let antenas: Antena[] = [];

loadAntenasFromApi();

async function loadAntenasFromApi(): Promise<void> {
  const remoteAntenas: Antena[] = await apiGetAntennas();
  antenas.push(...remoteAntenas);
  refreshOrdersTable();
}

initMap();

let antenasTable = new DataTable("#myTable", {
  data: antenas,
  columns: [
    { title: "Name", data: "name" },
    { title: "Operator", data: "operator" },
    { title: "Type", data: "type" },
    { title: "Status", data: "status" },
    { title: "Neighborhood", data: "neighborhood" },
    {
      title: "Actions",
      data: null,
      render: (data) => `<div class="container-buttons">
    <button title="Show Location" class="btn show-btn" data-id="${data.id}">Show</button>
    <button title="Hide Location" class="btn hide-btn" data-id="${data.id}">Hide</button>
    </div>`,
    },
  ],
});


function refreshOrdersTable() {
  antenasTable.clear();
  antenasTable.rows.add(antenas);
  antenasTable.draw();

}

const tableElement = document.getElementById('myTable') as HTMLTableElement;

tableElement.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const id: string = String(target.getAttribute('data-id'));
  
  if (!id) return;
 
  const antennaData: Antena | undefined = antenas.find(antena => antena.id == id);

  if (target.classList.contains('show-btn') && antennaData) {
    showAntennaLocation(antennaData);
    activeButtonMarker(id, true);
  }
  
  if (target.classList.contains('hide-btn')) {
    hideAntennaLocation(id);
    activeButtonMarker(id, false);
  }
});

function activeButtonMarker(id: string, activate: boolean): void {
  const boton = tableElement.querySelector(`.show-btn[data-id="${id}"]`) as HTMLButtonElement;
  if (boton) {
    if (activate) {
      boton.classList.add('active-style');
    } else {
      boton.classList.remove('active-style');
    }
  }
}