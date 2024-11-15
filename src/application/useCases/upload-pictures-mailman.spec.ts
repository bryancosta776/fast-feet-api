import { Test, TestingModule } from '@nestjs/testing';
 
import { PictureRepository } from '../repositories/picture-repository';
import { Uploader } from '../storage/uploader';
 
import { UploadPictureUseCases } from './upload-pictures-mailman';

describe('UploadPictureUseCases', () => {
  let useCase: UploadPictureUseCases;
  let pictureRepository: PictureRepository;
  let uploader: Uploader;

  // Mocking the dependencies
  const mockPictureRepository = {
    create: jest.fn(),
  };

  const mockUploader = {
    upload: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadPictureUseCases,
        { provide: PictureRepository, useValue: mockPictureRepository },
        { provide: Uploader, useValue: mockUploader },
      ],
    }).compile();

    useCase = module.get<UploadPictureUseCases>(UploadPictureUseCases);
    pictureRepository = module.get<PictureRepository>(PictureRepository);
    uploader = module.get<Uploader>(Uploader);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should upload a picture and return the picture object', async () => {
    // Arrange: Prepare the inputs and mocks
    const fileName = 'test-image.png';
    const fileType = 'image/png';
    const body = Buffer.from('image data');
    const mockFileUrl = 'https://example.com/test-image.png';

    mockUploader.upload.mockResolvedValueOnce({ url: mockFileUrl });
    mockPictureRepository.create.mockResolvedValueOnce({
      id: '1',
      fileName,
      fileType,
      body: body.toString('base64'),
      shipmentId: 'qualquer coisa',
      url: mockFileUrl,
    });

    const request = { fileName, fileType, body };

  
    const result = await useCase.execute(request);

 
    expect(result.picture).toEqual({
      id: '1',
      fileName,
      fileType,
      body: body.toString('base64'),
      shipmentId: 'qualquer coisa',
      url: mockFileUrl,
    });
    expect(mockUploader.upload).toHaveBeenCalledWith({
      fileName,
      fileType,
      body,
    });
    expect(mockPictureRepository.create).toHaveBeenCalledWith({
      fileName,
      fileType,
      body: body.toString('base64'),
      shipmentId: 'qualquer coisa',
      url: mockFileUrl,
    });
  });

  it('should throw an error when the file type is invalid', async () => {
    const request = { fileName: 'invalid-file.txt', fileType: 'text/plain', body: Buffer.from('file content') };

    await expect(useCase.execute(request)).rejects.toThrowError('Tipo de arquivo inválido! Apenas JPEG, PNG ou PDF são permitidos.');
  });

  it('should throw an error if uploading the file fails', async () => {
    const fileName = 'test-image.png';
    const fileType = 'image/png';
    const body = Buffer.from('image data');
    const request = { fileName, fileType, body };

    mockUploader.upload.mockRejectedValueOnce(new Error('Upload failed'));

    await expect(useCase.execute(request)).rejects.toThrowError('Erro ao fazer o upload do arquivo: Upload failed');
  });
});
