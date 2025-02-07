<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run()
    {
        for ($i=1; $i<=15; $i++){
            $data['name'] = 'Ruang ' . $i;
            
            $this->db->table('rooms')->insert($data);
        }

    }
}
