<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\I18n\Time;

class NotificationSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create('id_ID');

        for ($i = 0;$i < 15; $i++) {
            $picName = $faker->name();
            
            $data = [
                'employee_id'       => $faker->numberBetween(1, 15),
                'guestbook_id'       => $faker->numberBetween(1, 15),
                'status'            => $faker->numberBetween(0,1),
                'created_at'        => $faker->dateTimeBetween('2018-01-01', '2025-02-04')->format('Y-m-d H:i:s'),
                'updated_at'        => Time::now('Asia/Jakarta')
            ];

            $this->db->table('notifications')->insert($data);
        }
    }
}
