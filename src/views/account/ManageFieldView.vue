<template>
    <v-table
        fixed-header
    >
        <thead>
            <tr>
                <th
                    v-for="header in headers"
                    cols="3"
                >
                    {{ header.name }}

                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="items in roles"
            >
                <td>
                    {{ items }}
                </td>
                
                <td>
                    <v-checkbox hide-details></v-checkbox>
                </td>
                <td>
                    <v-checkbox hide-details></v-checkbox>
                </td>
                <td>
                    <v-checkbox hide-details></v-checkbox>
                </td>
                <td>
                    <v-checkbox hide-details></v-checkbox>
                </td>
                <td>
                    <v-checkbox hide-details></v-checkbox>
                </td>
            </tr>
        </tbody>
    </v-table>

    <v-divider class="mt-1"/>
    <br/>

    <v-row justify="end">
        <v-btn color="#BAD4AF" class="ma-2" flat>Save</v-btn>
        <v-btn color="#CECECE" class="ma-2" flat>Cancel</v-btn>
    </v-row>
</template>

<script>
import {updateCrumbs} from "@/functions/breadcrumbsHandler.js"
export default {
    data(){
        return {
            roles: ['Value Chain Data Analyst', 'VC Player', 'Enabler', 'Consumer'],
            headers: [
                {name: 'Role', col_name: 'role', align: 'center', width: '1%'},
                {name: 'Field 1', col_name: 'field_1', align: 'center', width: '1%'},
                {name: 'Field 2', col_name: 'field_2', align: 'center', width: '1%'},
                {name: 'Field 3', col_name: 'field_3',  align: 'center', width: '1%'},
                {name: 'Field 4', col_name: 'field_4',  align: 'center', width: '1%'},
                {name: 'Field 5', col_name: 'field_5',  align: 'center', width: '1%'},
            ],
        }
    },
    mounted(){
        
    },
    beforeMount(){
    },
    methods: {

    },
}
</script>