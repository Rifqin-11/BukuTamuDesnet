<?php

namespace App\Models;

use CodeIgniter\Model;

class EmployeesModel extends Model
{
    protected $table            = 'employees';
    protected $primaryKey       = 'id';
    protected $allowedFields = ['name', 'password', 'email', 'is_admin', 'photo', "position"];

    public function getMeetingWith() {
        return $this->db->table('employees')
                        ->select('employees.id, employees.name, position')
                        ->join('guestbooks', 'employees.id=guestbooks.employee_id')
                        ->groupBy('employees.id')
                        ->get()
                        ->getResultArray();
    }
}