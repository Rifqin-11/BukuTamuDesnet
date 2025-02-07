<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class GuestBook extends Migration
{
    
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'          => 'INT',
                'constraint'    => 10,
                'unsigned'      => true,
                'auto_increment'=> true
            ],
            'institution_name' => [
                'type'          => 'VARCHAR',
                'constraint'    => '255'
            ],
            'pic_name' => [
                'type'          => 'VARCHAR',
                'constraint'    => '255'
            ],
            'phone_number' => [
                'type'          => 'VARCHAR',
                'constraint'    => '50'
            ],
            'employee_id'  => [
                'type'          => 'INT',
                'constraint'    => 10,
                'unsigned'      => true
            ],
            'room_id'  => [
                'type'          => 'INT',
                'constraint'    => 10,
                'unsigned'      => true,
                'null'          => true
            ],
            
            'agenda' => [
                'type'          => 'VARCHAR',
                'constraint'    => '255'
            ],
            'identity_photo' => [
                'type'          => 'VARCHAR',
                'constraint'    => '255',
                'null'          => true
            ],
            'created_at' => [
                'type'          => 'DATETIME',
                'null'          => true
            ],
            'updated_at' => [
                'type'          => 'DATETIME',
                'null'          => true
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('employee_id', 'employees', 'id', 'RESTRICT', 'RESTRICT');
        $this->forge->addForeignKey('room_id', 'rooms', 'id', 'RESTRICT', 'RESTRICT');
        $this->forge->createTable('guestbooks');
    }

    public function down()
    {
        $this->forge->dropTable('guestbooks');
    }
}
