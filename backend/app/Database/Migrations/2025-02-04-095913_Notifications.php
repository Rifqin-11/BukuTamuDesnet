<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Notifications extends Migration
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
            'employee_id'  => [
                'type'          => 'INT',
                'constraint'    => 10,
                'unsigned'      => true
            ],
            'guestbook_id'  => [
                'type'          => 'INT',
                'constraint'    => 10,
                'unsigned'      => true
            ],
            'status' => [
                'type'          => 'TINYINT',
                'constraint'    => 1,
                'unsigned'      => true
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
        $this->forge->addForeignKey('guestbook_id', 'guestbooks', 'id', 'RESTRICT', 'RESTRICT');
        $this->forge->createTable('notifications');
    }

    public function down()
    {
        $this->forge->dropTable('notifications');
    }
}
