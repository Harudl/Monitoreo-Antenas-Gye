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
      render: (data: Antena) => `<div class="container-buttons">
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

const tableElement = document.querySelector('#myTable') as HTMLTableElement;

tableElement.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const id: string = String(target.getAttribute('data-id'));
  
  if (!id) return;
 
  const antennaData = antenas.find(antena => antena.id == id);

  if (target.classList.contains('show-btn') && antennaData) {
    showAntennaLocation(antennaData);
    activeRowMarker(id, true);
  }
  
  if (target.classList.contains('hide-btn')) {
    hideAntennaLocation(id);
    activeRowMarker(id, false);
  }
});

function activeRowMarker(id: string, activate: boolean) {
  const boton = document.querySelector(`.show-btn[data-id="${id}"]`);
  const row = boton ? boton.closest('tr') : null ;
  if (row) {
    if (activate) {
      row.classList.add('row-active');
    } else {
      row.classList.remove('row-active');
    }
  }
}