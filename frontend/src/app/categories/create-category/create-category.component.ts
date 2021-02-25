import { Component, OnInit } from '@angular/core';
import { mimeType } from "./mime-type.validator";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Category } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categoryname : string = '';
  categorydescription : string = '';
  categoryimageurl: string = '';
  category: Category;
  isLoading = false;
  form: FormGroup;
  imagePreview:string;
  private mode = "create";
  private eventId: string;

  constructor(private authService: AuthService,
    public route: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.form = new FormGroup({
      categoryname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      categorydescription: new FormControl(null, { validators: [Validators.required] }),
      
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),

    });
  }

  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(file);
  }

  onSaveCategory(){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.categoryService.createCategory(
        this.form.value.categoryname,
        this.form.value.categorydescription,
        this.form.value.image
      );
    // } else {
    //   this.eventService.getEventById(
    //     this.eventId,
    //   );
    }
    //console.log(this.eventId);
    this.form.reset();
  }
}
