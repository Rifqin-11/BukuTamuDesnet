<?php

namespace App\Database\Seeds;

use CodeIgniter\CodeIgniter;
use CodeIgniter\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create('id_ID');

        for ($i=0;$i<15;$i++) {
            $name = $faker->name();
            $data = [
                'name'      => $name,
                'password'  => $faker->password(6, 12),
                'email'     => $faker->email(),
                'is_admin'  => 0,
                'photo'     => $name . '.jpg',
                'position'  => $faker->jobTitle()
            ];

            $this->db->table('employees')->insert($data);
        }
    }
}
