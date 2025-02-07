<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Employees extends Migration
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
            'name' => [
                'type'          => 'VARCHAR',
                'constraint'    => '255'
            ],
            'password' => [
                'type'          => 'VARCHAR',
                'constraint'    => '255'
            ],
            'email' => [
                'type'          => 'VARCHAR',
                'constraint'    => '255'
            ],
            'is_admin' => [
                'type'          => 'TINYINT',
                'constraint'    => 1
            ],
            'photo' => [
                'type'          => 'VARCHAR',
                'constraint'    => '255',
                'null'          => true
            ],
            'position' => [
                'type'          => 'VARCHAR',
                'constraint'    => '255'
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('employees');
    }

    public function down()
    {
        $this->forge->dropTable('employees');
    }
}
