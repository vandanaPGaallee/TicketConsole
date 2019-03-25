<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row style="padding:50px 20px; background-color: #e3e3e3">
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label-class="font-weight-bold" label-align-sm="right" label="Filter:" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3"  label-class="font-weight-bold" label-align-sm="right" label="Sort:" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
              <!-- <option slot="second" :value="Created on">Created on</option> -->
            </b-form-select>
            <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
              <option :value="false">Asc</option> <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

<!--       <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortDirection" slot="append">
              <option value="asc">Asc</option> <option value="desc">Desc</option>
              <option value="last">Last</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col> -->

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label-class="font-weight-bold" label-align-sm="right" label="Per page:" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label-class="font-weight-bold" label-align-sm="right" label="Filter By Severity:" class="mb-0">
          <b-form-select v-model="severity.selected" @change="tableFilter" :options="severity.options" />
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label-class="font-weight-bold" label-align-sm="right" label="Filter By Reviews:" class="mb-0">
          <b-form-select v-model="satisfaction.selected" @change="tableFilter" :options="satisfaction.options" />
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label-class="font-weight-bold" label-align-sm="right" label="Filter By Priority:" class="mb-0">
          <b-form-select v-model="priority.selected" @change="tableFilter" :options="priority.options" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table id ="table" striped hover
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
      thead-class="header"
      align="center"
    >
      <template slot="ticket" slot-scope="row">
        {{ row.value }}
      </template>

      <template slot="Requestor" slot-scope="row">
        {{ row.value }}
      </template>

      <template slot="Severity" slot-scope="row">
        {{ row.value }}
      </template>

      <template slot="Satisfaction" slot-scope="row">
        {{ row.value }}
      </template>

      <template slot="FiledAgainst" slot-scope="row">
        {{ row.value }}
      </template>

      <template slot="Ticket Creation Date" slot-scope="row">
        {{ row.value }}
      </template>

      <template slot="TicketType" slot-scope="row">
        {{ row.value }}
      </template>

      <template slot="Priority" slot-scope="row">
        {{ row.value }}
      </template>

      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Show json
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col md="12" class="my-1">
        <b-pagination
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          class="my-0"
          align="center"
        />
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
      <pre>{{ modalInfo.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
/* eslint-disable */
  const items = [
    { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
    { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
    {
      isActive: false,
      age: 9,
      name: { first: 'Mini', last: 'Navarro' },
      _rowVariant: 'success'
    },
    { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
    { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
    { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
    { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
    {
      isActive: true,
      age: 87,
      name: { first: 'Larsen', last: 'Shaw' },
      _cellVariants: { age: 'danger', isActive: 'warning' }
    },
    { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
    { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
    { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
    { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
  ]
  import tickets from '../json/data.json'
  export default {
    name: 'Table',
    data() {
      return {
        tickets: tickets,
        items: tickets,
        fields: [
          { key: 'ticket', label: 'Ticket Number', sortable: true, sortDirection: 'desc' },
          { key: 'Requestor', label: 'Requestor', sortable: true, class: 'text-center' },
          { key: 'Severity', label: 'Severity' },
          { key: 'Satisfaction', label: 'Satisfaction' },
          { key: 'FiledAgainst', label: 'Filed against' },
          { key: 'TicketType', label: 'Ticket Type' },
          { key: 'Ticket Creation Date', label: 'Created on'},
          { key: 'Priority', label: 'Priority' },
          { key: 'actions', label: 'Actions' }
        ],
        currentPage: 1,
        perPage: 20,
        totalRows: tickets.length,
        pageOptions: [5, 10, 15, 20],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        modalInfo: { title: '', content: '' },
        severity: {
          options: [
            { value: null, text: 'Please select an option' },
            { value: '0 - Unclassified', text: 'Unclassified' },
            { value: '1 - Minor', text: 'Minor' },
            { value: '2 - Normal', text: 'Normal' },
            { value: '3 - Major', text: 'Major' },
            { value: '4 - Critical', text: 'Critical' }
          ], 
          selected: null
        },
        satisfaction: {
          options: [
            { value: null, text: 'Please select an option' },
            { value: '0 - Unknown', text: 'Unknown' },
            { value: '1 - Unsatisfied', text: 'Unsatisfied' },
            { value: '2 - Satisfied', text: 'Satisfied' },
            { value: '3 - Highly satisfied', text: 'Highly satisfied' }
          ], 
          selected: null
        },
        priority: {
          options: [
            { value: null, text: 'Please select an option' },
            { value: '0 - Unassigned', text: 'Unassigned' },
            { value: '1 - Low', text: 'Low' },
            { value: '2 - Medium', text: 'Medium' },
            { value: '3 - High', text: 'High' }
          ], 
          selected: null
        }
      }
    },
    computed: {
      sortOptions() {
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    methods: {
      info(item, index, button) {
        this.modalInfo.title = `Row index: ${index}`
        this.modalInfo.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'modalInfo', button)
      },
      resetModal() {
        this.modalInfo.title = ''
        this.modalInfo.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }, 
      tableFilter() {
        var temp = this.tickets
        if (this.items) {
            if(this.severity.selected != null) {
              temp = temp.filter((item) => item.Severity.includes(this.severity.selected));
            }
            if(this.priority.selected != null) {
              temp = temp.filter((item) => item.Priority.includes(this.priority.selected));
            }
            if(this.satisfaction.selected != null) {
              temp = temp.filter((item) => item.Satisfaction.includes(this.satisfaction.selected));
            }  
        }
        this.totalRows = temp.length
        this.items = temp
      }
    }
  }
</script>

<style>
.header{
  background-color: #17a2b8 !important;
  color: white;
}
#table {
  margin: 5px;

}
</style>