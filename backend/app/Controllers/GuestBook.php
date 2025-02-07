<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

use App\Models\GuestBooksModel;
use App\Models\EmployeesModel;

class GuestBook extends ResourceController
{
    
    /**
     * Return an array of resource objects, themselves in array format.
     *
     * @return ResponseInterface
     */
    public function index()
    {        
        $guestBookModel = new GuestBooksModel;
        $data= $guestBookModel->findAll();
        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function show($id = null)
    {
        $guestBookModel = new GuestBooksModel();
        $data = $guestBookModel->find(['id' => $id]);
        if(!$data){
            return $this->failNotFound("No data found whit this id:" . $id);
        }
        return $this->respond($data[0]);
    }

    /**
     * Create a new resource object, from "posted" parameters.
     *
     * @return ResponseInterface
     */
    public function create()
    {
        // Cors
        $response = service('response');
        $response->setHeader('Access-Control-Allow-Origin', '*');
        $response->setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if ($this->request->getMethod() === 'options') {
            return $response;
        }

        helper(['form']);
        $rules = [
            'institution_name' => 'required',
            'pic_name' => 'required',
            'phone_number' => 'required|numeric',
            'agenda' => 'required',
            'identity_photo' => 'uploaded[identity_photo]|max_size[identity_photo,2048]|is_image[identity_photo]|mime_in[identity_photo,image/jpg,image/jpeg,image/png]'
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $image = $this->request->getFile('identity_photo');
        $newName = $image->getRandomName();
        $image->move('uploads/identity_photos', $newName);
        $imagePath = ($newName);

        $data = [
            'institution_name' => $this->request->getVar('institution_name'),
            'pic_name' => $this->request->getVar('pic_name'),
            'phone_number' => $this->request->getVar('phone_number'),
            'employee_id' => $this->request->getVar('employee_id'),
            'agenda' => $this->request->getVar('agenda'),
            'identity_photo' => $imagePath
        ];

        $guestBookModel = new GuestBooksModel();
        $guestBookModel->save($data);

        return $this->respondCreated(['message' => 'Data inserted successfully']);
    }

    /**
     * Add or update a model resource, from "posted" properties.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function update($id = null)
    {
        //
    }

    /**
     * Delete the designated resource object from the model.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function delete($id = null)
    {
        //
    }
}
