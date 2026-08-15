<?php

namespace App\Http\Controllers;

use App\Http\Requests\DocumentRequest;
use Illuminate\Http\Request;
use App\Service\DocumentService;
class DocumentController extends Controller
{
    protected DocumentService $document_service;
    public function __construct(DocumentService $document_service)
    {
        $this->document_service = $document_service;
    }
    public function getDocuments(){
        $docs =$this->document_service->getDocuments();
        return response()->json([
            'code'=>200,
            'data'=>$docs
        ]);
    }
    public function removeDocument(int $id)
    {
       
         $this->document_service->removeDocument($id);

        return response()->json([
            'code'    => 200,
            'message' => 'Document deleted successfully.',
        ]);
    }
    public function storeDocuments(DocumentRequest $request){
        $docs=$this->document_service->storeDocuments($request->validated());
        return response()-> json([
            'code'=> 201,
           'message'=>"Document created successfully."
        ],201);
    }
    public function downloadDocument(int $id){
        return $this->document_service->downloadDocument($id);
    
    }
}
