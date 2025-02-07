<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\I18n\Time;

class GuestSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create('id_ID');

        for ($i = 0;$i < 15; $i++) {
            $picName = $faker->name();
            
            $data = [
                'institution_name'  => $faker->company(),
                'pic_name'          => $picName,
                'phone_number'      => $faker->phoneNumber(),
                'employee_id'       => $faker->numberBetween(1, 15),
                'agenda'            => $faker->sentence(5),
                'identity_photo'    => $picName . '.jpg',
                'created_at'        => $faker->dateTimeBetween('2018-01-01', '2025-02-04')->format('Y-m-d H:i:s'),
                'updated_at'        => Time::now('Asia/Jakarta')
            ];

            $this->db->table('guestbooks')->insert($data);
        }
    }
}
