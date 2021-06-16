import { ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../services/Profile.model';
import { profileService } from '../services/profile.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { paymentService } from '../services/payment.service';
import { Payment } from '../services/Payment.model';
import { DatePipe } from '@angular/common';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { notificationService } from '../services/notification.service';
import { MatSlidePanel } from 'ngx-mat-slide-panel';
import { NotificationComponent } from '../notification/notification.component';
import { VendorDetailsComponent } from '../vendor-details/vendor-details.component';
import Swal from 'sweetalert2';
import { EmailComponent } from '../email/email.component';
import { slotService } from '../services/slot.service';
import { relativeService } from '../services/relative.service';
import { accountService } from '../services/account.service';
import { SideProfileComponent } from '../side-profile/side-profile.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { attachmentService } from '../services/Attachment.service';
import { remarkService } from '../services/remark.service';
import { photoService } from '../services/photo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DelremarkService } from '../servicesDeleted/remark.service';
import { DelprofileService } from '../servicesDeleted/profile.service';
import { DelpaymentService } from '../servicesDeleted/payment.service';
import { DelattachmentService } from '../servicesDeleted/Attachment.service';
import { DelphotoService } from '../servicesDeleted/photo.service';
import { DelrelativeService } from '../servicesDeleted/relative.service';
import { EditPaymentComponent } from '../edit-payment/edit-payment.component';
import { DelstatusService } from '../servicesDeleted/delStatus.service';



@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss'],
})
export class VendorProfileComponent implements OnInit {


  id;
  username: any;
  profileName:any;
  profileRole:any;
  slot:any;
  rid: any;
  email:any;
  retrieveData:any;
  paymentHistory:any;
  paymentList: any = [];
  paymentData: MatTableDataSource<any>;
  retrieveDataLength:any;
  list:any[];
  close;
  opened = true
  contract: any;


  nextPayment: any;
  nextDate:any;
  dateToday;
  latestPaymentDate:any;
  today;
  overdueDays;
  overdue;
  finalOverdue;
  nextPay:any;
  vendorIC;
  phoneNo;
  vendorID;
  notifyData: any;
  notifyNo: any;
  price: any;
  searchKey: any;
  dateFilter: any;
  selectFilter: any = "All";
  rent_Date: any;
  color1: any = '#ffffff';
  color2: any;
  color3: any;
  color4: any;
  color5:any;
  buttonColor1: any = '#888888';
  buttonColor2:any;
  buttonColor3:any;
  buttonColor4:any;
  buttonColor5:any;
  showPayment: any = true;
  showProfile: any = false;
  showAttachment: any = false;
  showSpouse: any = false;
  showRemarks:any = false;
  address:any;
  location: any;
  slotArray: any = [];
  relativeArray: any = [];
  childArray: any = [];
  spouseArray: any = [];
  accountRole: any;
  isAdmin;
  viewOnly: any;
  editSpouse = false;
  spouseName: any;
  spouseIC: any;
  spouseNumber:any;
  value: any;
  spouseRid: any;
  spouseRelationship: any;
  spouseDataArray: any =[];
  spouseID:any;
  showAddChild: any = false;
  childIC:any;
  childNumber:any;
  childName: any;
  RemarksArray: any = [];
  childDataAttay:any = []
  editChildArray: any = [];
  profileArray: any = [];
  attachmentArray: any = [];
  initialAttachment: any = [];
  onEditRemarks = false;
  description: any;
  descriptionRemarks:any;
  picArray: any = []
  proPic: any;
  profileID:any;
  ref_No: any;
  

  newChildName:any;
  newChildICNumber:any;
  showEdit = false;
  showEditSpouse = false;
  numberSpouse: any
  newSpouseName: any;
  newSpouseICNumber: any;



  number: any;
  baseURL: any;
  profilePic: any;
  photoArray: any = []
  profilePhoto: any;
  viewNotification: any = [];
  listNotify: any = [];
  date: Date;
  accountRid: string;
  listNotifyArray: any = [];
  
  uploadFile = false;
  paymentRid: any = [];
  slotRid: any = [];
  

  fileUploadForm: FormGroup;
  fileInputLabel: string;


  displayedDataColumns: string[] = [
    'email',
    'payment_Date',
    'due_Date',
    'price',
    'send_Email',
    'createdAt',
    'actions'

  ];
  role: string;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  


  

  constructor(
    private router: Router,
    private profiles: profileService,
    private route: ActivatedRoute,
    private payment: paymentService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private notification: notificationService,
    private slidePanel: MatSlidePanel,
    private slotService: slotService,
    private relativeService: relativeService,
    private accountService: accountService,
    private formBuilder : FormBuilder,
    private attachmentService: attachmentService,
    private remarkService: remarkService,
    private photoService: photoService,
    private sanitizer: DomSanitizer,


    //deleted records
    private delRemarkService: DelremarkService,
    private delProfileService: DelprofileService,
    private delPaymentService: DelpaymentService,
    private delAttachmentService: DelattachmentService,
    private delPhotoService:DelphotoService,
    private delRelativeService: DelrelativeService,
    private delStatusService: DelstatusService

  ) {
    const compId = this.route.snapshot.paramMap.get('rid')
    this.id = compId
    this.close = false;

    this.value = [
      {
        id: "00"
      },
      {
        id: "01"
      },
      {
        id: "30"
      },
      {
        id: "31"
      },
      {
        id: "50"
      },
      {
        id: "51"
      },

    ]

   }

  ngOnInit(): void {
    this.notifyNumber();
    this.refreshData();
    this.retrievePhoto();
    this.identifyRole();
    this.retrieveProfilePic();
    this.uploadFile = false;

  

    this.profileName = sessionStorage.getItem('username');
    this.profileRole = sessionStorage.getItem('role');

    this.showAddChild = false;
    this.baseURL = this.attachmentService.baseURL();

    this.fileUploadForm = this.formBuilder.group({
      name: ['',Validators.required],
      uploadedImage: ['',Validators.required]
    })

  }

  goToReceipt(element){
    console.log(element)
    this.router.navigate(['/receipt/'+element.paymentID])
  }

  goToPaymentEdit(element){
    this.dialog.open(EditPaymentComponent, {
      width: "800px",
        height: "90%",
        panelClass:'custom-modalbox',
        data:{
          dataKey: element
        }
    }).afterClosed().subscribe(data=> {
      this.refreshData();
    })
  }

  transform(url: string) {
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  clearSearch(){
    this.searchKey = "";
    this.paymentData.filter = this.searchKey.trim().toLowerCase();
  }

  //identify if user is admin
  identifyRole(){
    this.accountRole = sessionStorage.getItem("role")

    if (this.accountRole == "Administrator") {
      console.log(this.accountRole)
      this.isAdmin = true;
      this.viewOnly = false;
    } 
    
    // else{
    //   this.isAdmin = false;
    // }

    if (this.accountRole == "View-only") {
      this.isAdmin = false;
      this.viewOnly = true;
    }


  }

  retrievePhoto(){
    console.log(this.id)
    this.photoService.findByRid(this.id).subscribe(data=> {
      this.photoArray = data;

      if (this.photoArray.length !== 0){
        var baseURL = this.photoService.baseURL();
        this.profilePhoto = baseURL+"/"+this.photoArray[0].link;
       
      }

    },error=> {
      console.log(error)
    })
  }



  goToPrint(){
    this.router.navigate(['/vendor-details/'+this.id])
  }

  sendEmail(){
    this.dialog.open(EmailComponent, {
      width: "800px",
        height: "90%",
        panelClass:'custom-modalbox',
        data:{
          dataKey: this.retrieveData[0]
        }
    }).afterClosed().subscribe(data=> {
      this.refreshData();
    })
  }

  refreshData(){
    this.payment.findByRid(this.id).subscribe(data => {
      this.paymentHistory = data;
      this.paymentList = data;


      for (let i = 0; i<this.paymentList.length;i++){
        var newDate = new Date (this.paymentList[i].payment_Date);
        var dueDate = new Date (this.paymentList[i].due_Date);
        var created = new Date (this.paymentList[i].createdAt);
    

        let payment = this.datePipe.transform(newDate,'dd/MM/YYYY HH:mm')
        let due = this.datePipe.transform(dueDate,'dd/MM/YYYY HH:mm')
        let create = this.datePipe.transform(created,'dd/MM/YYYY HH:mm')

        this.paymentList[i].createdAt = create;
        this.paymentList[i].payment_Date = payment;
        this.paymentList[i].due_Date = due;
      }


      this.paymentData = new MatTableDataSource(this.paymentHistory);
      this.paymentData.sort = this.sort;
      this.paymentData.paginator = this.paginator;



    });

    this.retrieveProfile();

  }


  async onDelete(){
  
    var rid = sessionStorage.getItem('rid');
   const  status = await Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible. Vendor Profile Will be mark as discontinued/deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
      input: 'select',
      inputOptions: {
        'Deceased': 'Deceased',
        'Blacklisted': 'Blacklisted',
        'Discontinued': 'Discontinued',
      },
      inputPlaceholder: 'Reason for deletion'
      
    }).then((result) => {

      if (result.value) {
        var chosenStat = result.value;
        const date = new Date();
        const notify = {
          rid: rid,
          title: 'Account Deleted'+' '+this.username, 
          description: 'Vendor profile with \n name: '+this.username+'\n Account ID: '+this.id+'\n was deleted !',
          category: 'Deleted vendor profile',
          date: date,
          view: false
        };
  
        this.notification.create(notify).subscribe(resp=> {
          
        },error=> {
          console.log(error)
        });


        var profile = []
        this.profiles.findByRid(this.id).subscribe(data=> {
          profile = data;

          if(profile.length !==0){

            var rid = profile[0].rid;
            var overdue_Day = this.finalOverdue;
            var latest_Payment_Date = profile[0].latest_Payment_Date;
            var next_Payment_Date = profile[0].latest_Due_Date;


            var status = {
              rid: rid,
              status: chosenStat,
              overdue_Day: overdue_Day,
              last_Payment_Date: latest_Payment_Date,
              next_Payment_Date: next_Payment_Date
            }

            this.delStatusService.create(status).subscribe(data=> {
              console.log(data)
            },error=> {
              console.log(error)
            })
            
            profile[0].slot = null;
            profile[0].slot_Price = null;
            this.delProfileService.create(profile[0]).subscribe(data=> {
              console.log(data)
            },error=> {
              console.log(error)
            })
          }

        })

     

        //Deleting Payment Service --------------------------------------------------------------------

        this.payment.findByRid(this.rid).subscribe(resp=> {
          this.paymentRid = resp;
        

          if (this.paymentRid.length > 0){
            for (let i = 0; i < this.paymentRid.length; i++){
              this.delPaymentService.create(this.paymentRid[i]).subscribe(data=> {
               

                this.payment.delete(this.paymentRid[i].id).subscribe(data=> {
                  
                }, error=> {
                  console.log(error)
                })

              },error=> {
                console.log(error)
              })
             
            }
          }
        }, err=> {
          console.log(err)
        })


        //Updating Slot Service------------------------------------------------------------

        this.slotService.findByRid(this.id).subscribe(resp=> {  
          this.slotRid = resp;

          if (this.slotRid.length !== 0){

            this.slotRid[0].rid = null;      
            this.slotRid[0].taken = false;      
              this.slotService.update(this.slotRid[0].id,this.slotRid[0]).subscribe(data=> {
                console.log(data);
              },error=> {
                console.log(error)
              })
            
          }
        },error=> {
          console.log(error)
        })


        //Deleting Payment Service -----------------------------------------------------------------------------

        var relative = [];
        this.relativeService.findByrid(this.id).subscribe(data=> {
          relative = data;

          if (relative.length !== 0){

            for (let i = 0; i<relative.length; i++){
              this.delRelativeService.createRelative(relative[i]).subscribe(data=> {
                console.log(data)
                this.relativeService.delete(relative[i].id).subscribe(data=> {
                  console.log(data)
                },error=> {
                  console.log(error)
                })

              },error=> {
                console.log(error)
              })
          
            }
          }
        })

        //Deleting Attachment Service ---------------------------------------------------------------------------

        var attachments = [];

        this.attachmentService.findByVendorid(this.id).subscribe(data=> {
          attachments = data;

          if (attachments.length !== 0){
            for (let i =0; i<attachments.length;i++){
              this.delAttachmentService.create(attachments[i]).subscribe(data=> {
                console.log(data)

                this.attachmentService.delete(attachments[i].id).subscribe(data=> {
                  console.log(data);
                },error=> {
                  console.log(error)
                })


              },error=> {
                console.log(error)
              })
          
            }
          }
        })


        //Deleting Remark Service ---------------------------------------------------------------------------------

        var remark = []
        this.remarkService.findByRid(this.id).subscribe(data=> {
          remark = data;

          if (remark.length !== 0){

            this.delRemarkService.create(remark[0]).subscribe(data=> {
              console.log(data)

              this.remarkService.delete(remark[0].id).subscribe(data=> {
                console.log(data)
              }, error=> {
                console.log(error)
              })


            },error=> {
              console.log(error)
            })
          
          }
        })


        //Deleting Photo Service ----------------------------------------------------------------------------------

        var photo = []
        this.photoService.findByRid(this.id).subscribe(data=> {
          photo = data;

          if (photo.length !== 0){
            this.delPhotoService.create(photo[0]).subscribe(data=> {
              console.log(data);

              this.photoService.delete(photo[0].id).subscribe(data=> {
                console.log(data)
              }, error=> {
                console.log(error)
              })

            },error=> {
              console.log(error)
            })
        
          }
        })



        //Deleting profile Service ---------------------------------------------------------------------------------
     
      

        this.profiles.delete(this.retrieveData[0].id).subscribe(resp=> {

          Swal.fire(
            'Removed!',
            'Vendor Profile removed successfully.',
            'success'
          )
          
          this.router.navigate(['/dashboard']);
          
          
        },err=> {
          Swal.fire("Cannot Delete Profile","Please Check and Try Again!","error")
        });


      } else if (result.dismiss === Swal.DismissReason.cancel) {
    
        Swal.fire(
          'Cancelled',
          'Vendor Profile is still in our database.',
          'error'
        )
      } else if (!result.value){
        Swal.fire(
          'Cannot Delete',
          'Vendor Profile is still in our database. Please select the reason for discontinuing!',
          'error'
        )
      }
    });

  }


  retrieveProfile(){
    console.log(this.id)
    this.profiles.findByRid(this.id).subscribe(array=> {
      this.retrieveData = array
      console.log(this.retrieveData)

      if (this.retrieveData !== 0){

        this.username = this.retrieveData[0].name;
        this.slot = this.retrieveData[0].slot

        if (this.slot==null){
          this.slot="N/A"
        }
        this.address = this.retrieveData[0].address;
        this.price = this.retrieveData[0].slot_Price;

        if (this.price == null){
          this.price = 0
        }
        this.ref_No = this.retrieveData[0].ref_No;
        this.email = this.retrieveData[0].email
        this.vendorIC = this.retrieveData[0].IC_Number
        this.phoneNo = this.retrieveData[0].phone;
        this.rent_Date = this.retrieveData[0].rent_Date;
        this.rid = this.retrieveData[0].rid;
        this.contract = this.retrieveData[0].contract;
  
        if (this.contract){
          this.contract="Contract"
        } else {
          this.contract = "Non-Contract";
        }
        this.vendorID = this.id
        this.latestPaymentDate = this.retrieveData[0].latest_Payment_Date
    
  
        this.retrieveSlot(this.slot)
  
        //overdue days
        this.nextDate = this.retrieveData[0].latest_Due_Date
        this.nextPayment = this.datePipe.transform(this.nextDate,'MM/dd/yyyy') 
        this.nextPay = this.datePipe.transform(this.nextPayment, 'dd LLLL yyyy')
  
        this.dateToday = new Date()
        this.today = this.datePipe.transform(this.dateToday,'MM/dd/yyyy')
  
        if (this.nextPayment !== null){
          var parsedNextDate = parseDate(this.nextPayment)
          var parsedToday = parseDate(this.today)
    
          console.log("today: "+ parsedToday)
          console.log("latest Payment Date: " + parsedNextDate)
    
          var overdueTime = parsedToday.getTime() - parsedNextDate.getTime(); 
          this.overdueDays = overdueTime / (1000 * 3600 * 24);
          this.overdue = this.overdueDays
    
          console.log(this.overdueDays)
    
          var noOverdue = this.overdueDays - this.overdue
          this.finalOverdue = this.overdue
          
    
          if(this.overdueDays < 0){
            this.finalOverdue = noOverdue;
            console.log(this.finalOverdue);
          }
        } else {
          this.finalOverdue = 0;
          this.nextPay = "N/A"
        }
       
  
        //parse to date
        function parseDate(str) {
          var mdy = str.split('/');
          return new Date(mdy[2], mdy[0]-1, mdy[1]);
      }
  

      }
    
    })

  }

  retrieveSlot(slot){
    try{

      this.slotService.findBySlot(slot).subscribe(data=> {
        this.slotArray = data;
        console.log(this.slotArray)
        if (this.slotArray.length !== 0){
          this.location = this.slotArray[0].location;
        }
        

    },error=> {
      console.log(error)
    })

    } catch (error){
      console.log(error)
    }
   
  }

  addPayment(){
    this.router.navigate(['/add-payment'])
  }

  onEdit(){

    this.dialog.open(EditProfileComponent, {
      width: "800px",
      height: "90%",
      panelClass:'custom-modalbox',
      data: {

        dataKey: this.retrieveData[0]
      }
    }).afterClosed().subscribe(result=> {
      this.refreshData();
      this.retrievePhoto();
  
    });

  }

  viewDetails(){
    this.dialog.open(VendorDetailsComponent, {
      width: "800px",
      height: "90%",
      panelClass:'custom-modalbox',
      data: {

        dataKey: this.retrieveData[0]
      }
    }).afterClosed().subscribe(result=> {
      this.refreshData();
    });
  }

  

  goToDashboard(){
    console.log("hantu")
    this.router.navigate(["/dashboard"]);
  }

  openNav(){
    this.close = false;
  }

  closeNav(){
    this.close = true;
  }

  public notifyNumber(){
    this.listNotifyArray = [];

    this.date = new Date();
    var today = this.datePipe.transform(this.date,'dd-MM-yyyy'); 

    this.role = sessionStorage.getItem("role");
    this.accountRid = sessionStorage.getItem('rid')
    this.notification.findByView().subscribe(data => {
      this.viewNotification = data;

      if(this.role  == "Staff" || this.role == "View-only"){
        for (let i = 0; i < this.viewNotification.length; i++) {
          if(this.viewNotification[i].rid == this.accountRid){
            var newDate = this.viewNotification[i].date;
            let latest_Date = this.datePipe.transform(newDate, 'dd-MM-yyyy');

              if (latest_Date == today){
                this.listNotifyArray.push(this.viewNotification[i])
              }
            this.notifyNo = this.listNotifyArray.length;
          }
        } 
        
      }else if (this.role == "Administrator"){
        for (let i = 0; i < this.viewNotification.length; i++){
          var newDate = this.viewNotification[i].date;
          let latest_Date = this.datePipe.transform(newDate, 'dd-MM-yyyy');
          if (latest_Date == today) {
            this.listNotifyArray.push(this.viewNotification);
          }
          this.notifyNo = this.listNotifyArray.length;
        }

      }

    })
  }

  openNotification(){
    this.slidePanel.open(NotificationComponent, {
      slideFrom:'right'
    })
  }


  applyFilter(){
    this.paymentData.filter = this.searchKey.trim().toLowerCase();
  }

  onChange(data){

    const date = data;
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const day = date.substring(8,10);
    const fullDate = day+"/"+month+"/"+year;
    console.log(fullDate)
    this.paymentData.filter = fullDate.trim().toLowerCase();
  }

  clear(){
    this.dateFilter = "";
    this.paymentData.filter = this.dateFilter.toLowerCase();
  }


  goToPayment(){
    this.showPayment = true;
    this.showProfile = false;
    this.showAttachment = false;
    this.showRemarks = false;
    this.showSpouse = false;
    
    this.buttonColor1 = '#888888';
    this.color1 = '#ffffff';

    this.buttonColor2 = '#ffffff';
    this.buttonColor3 = '#ffffff';
    this.buttonColor4 = '#ffffff';
    this.buttonColor5 = '#ffffff';

    this.color2 = '#919191'
    this.color3 ='#919191'
    this.color4 = '#919191'
    this.color5 = '#919191'
  }

  goToFullProfile(){

    this.showProfile = true;
    this.showPayment = false;
    this.showAttachment = false;
    this.showRemarks = false;
    this.showSpouse = false;

    this.buttonColor2 = '#888888';
    this.color2 = '#ffffff';

    this.buttonColor1 = '#ffffff';
    this.buttonColor3 = '#ffffff';
    this.buttonColor4 = '#ffffff';
    this.buttonColor5 = '#ffffff';

    this.color1 = '#919191'
    this.color3 = '#919191'
    this.color4 = '#919191'
    this.color5 = '#919191'

  }


  goToSpouse(){

    this.showSpouse = true;
    this.showProfile = false;
    this.showPayment = false;
    this.showAttachment = false;
    this.showRemarks = false;

    
    this.buttonColor3 = '#888888';
    this.color3 = '#ffffff';

    this.buttonColor1 = '#ffffff';
    this.buttonColor2 = '#ffffff';
    this.buttonColor4 = '#ffffff';
    this.buttonColor5 = '#ffffff';

    this.color1 ='#919191'
    this.color2 = '#919191'
    this.color4 = '#919191'
    this.color5 = '#919191'
    this.relativeArray = [];
    this.retrieveRelative();
  }

  retrieveRelative(){

    this.childArray = [];
    this.spouseArray =[];

    this.relativeService.findByrid(this.rid).subscribe(data=> {
      this.relativeArray = data;
      console.log(this.relativeArray)
      if (this.relativeArray.length !== 0){

        for (let i = 0; i<this.relativeArray.length; i++){
          if (this.relativeArray[i].relationship == "spouse") {
  
            this.spouseArray.push(this.relativeArray[i])
  
          } else {
  
            this.childArray.push(this.relativeArray[i])
          }
  

      }
     

      }

      console.log(this.spouseArray)
      console.log(this.childArray)
    }, error=> {
      console.log(error)
    })

  }

  goToAttachment(){

    this.showAttachment = true;
    this.showProfile = false;
    this.showPayment = false;
    this.showRemarks = false;
    this.showSpouse = false;
    
    this.buttonColor4 = '#888888';
    this.color4 = '#ffffff';

    this.buttonColor1 = '#ffffff';
    this.buttonColor2 = '#ffffff';
    this.buttonColor3 = '#ffffff';
    this.buttonColor5 = '#ffffff';

    this.color1 = '#919191'
    this.color2 = '#919191'
    this.color3 = '#919191'
    this.color5 = '#919191';

    this.retrieveAttachment();

  }

  editAttachment(){
    this.uploadFile = true;
  }

  goToRemarks(){
    this.showRemarks = true;
    this.showProfile = false;
    this.showPayment = false;
    this.showAttachment = false;
    this.showSpouse = false;
    
    this.buttonColor5 = '#888888';
    this.color5 = '#ffffff';

    this.buttonColor1 = '#ffffff';
    this.buttonColor2 = '#ffffff';
    this.buttonColor3 = '#ffffff';
    this.buttonColor4 = '#ffffff';

    this.color1 = '#919191'
    this.color2 = '#919191'
    this.color3 = '#919191'
    this.color4 = '#919191';

    this.retrieveRemarks();
  }









  //Spouse --------------------------------------------------------


  onSpouse(){
    this.editSpouse = true;
  }

  cancelSpouse(){
    this.editSpouse = false;
    this.spouseName = "";
    this.spouseIC = "";
    this.spouseNumber ="";
  }

  onEditSpouse(data,i){
    this.numberSpouse = i;
    this.showEditSpouse = true;
    this.newSpouseICNumber = data.IC_Number;
    this.newSpouseName = data.name;
  }

  cancelSaveSpouse(){
    this.showEditSpouse = false;
    this.newSpouseName = "";
    this.newSpouseICNumber = "";
  }





  
  onDeleteSpouse(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible. Deleting the Spouse details may cause data loss',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'

    }).then((result) => {

      if (result.value){

        this.relativeService.delete(id).subscribe(result=> {

          Swal.fire(
            'Success',
            'Successfully delete Spouse detail',
            'success'
          )

          this.retrieveRelative()

          return;


        },error=> {
          Swal.fire(
            'Process Failed',
            'Spouse is still in the database.',
            'error'
          )
          return;
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Spouse is still in the database.',
          'error'
        )
        return;
      }
    });
  }


  saveSpouse(data,i){

    const name = this.newSpouseName;
    const IC_Number = this.newSpouseICNumber;
    const IC = this.newSpouseICNumber.substring(0,2);
    var lengthNo = this.newSpouseICNumber.length;
    console.log(lengthNo)
    const Number = this.newSpouseICNumber.substring(3,lengthNo);
    const relationship = "spouse";
    const compareIC = data.IC_Number;
    const compareID = data.id;
    console.log(data.IC_Number)
    console.log(Number)

    var exp = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");

    if (name !=="" && IC_Number !== ""){

      if (exp.test(Number) && Number.length == 6){

        var spouse= {
      
          rid: this.id,
          name: name,
          IC_Number: IC_Number,
          relationship: relationship

        }

        this.relativeService.findByIC(IC_Number).subscribe(data=> {
          this.editChildArray = data;


          if (this.editChildArray == 0){

            this.relativeService.update(compareID,spouse).subscribe(data=> {
              Swal.fire('Success','successfully updated Spouse details','success')
              this.retrieveRelative();
              this.showEditSpouse = false;
              this.newSpouseICNumber = "";
              this.newSpouseName = ""
              return;
            }, error=> {

              Swal.fire("Process Failed","Relative is still in the database","error")
              return;
            })
          } else {
            if (compareIC == this.editChildArray[0].IC_Number){

              this.relativeService.update(compareID,spouse).subscribe(data=> {
                Swal.fire('Success','successfully updated spouse details','success')
                this.retrieveRelative();
                this.showEditSpouse = false;
                this.newSpouseICNumber = "";
                this.newSpouseName = ""
                return;
              }, error=> {
  
                Swal.fire("Process Failed","Relative is still in the database","error")
                return;
              })

            } else {

              
              Swal.fire("Duplicate error","Spouse details is already existed in the database, Please Try Again","error")
              return;

            }
          }
        })


      } else {
        Swal.fire('Please Try Again',"Incorrect IC Number format",'error')
        return;
      }


    } else {

      Swal.fire(
        'PLease try again',
        'Cannot leave the field empty',
        'error'
      )
      return;
    }
  

    

  }


  submitSpouse(){

    const Number = this.spouseNumber;
    const IC = this.spouseIC;
    const name = this.spouseName;
    const IC_Number = IC+"-"+Number;
    const relationship = "spouse";
    const myrid = this.id;

    console.log(myrid)

    var exp = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");

    if (name !== "" && IC !== "" && Number !== "") {
      if (exp.test(Number) && Number.length ==  6){

        var spouse =  {
          rid: myrid,
          name: name,
          IC_Number: IC_Number,
          relationship: relationship
        }

        this.relativeService.findByIC(IC_Number).subscribe(data=> {
          this.spouseDataArray = data;
          console.log(this.spouseDataArray.length)
          

          if(this.spouseDataArray.length == 0) {
           
            this.relativeService.createRelative(spouse).subscribe(data=> {
             
              Swal.fire("Spouse created","Successfully created spouse",'success')
              this.retrieveRelative();
              this.editSpouse = false;
              this.spouseName = "";
              this.spouseIC = "";
              this.spouseNumber ="";
              return;
            


            },error=> {
              Swal.fire('Please Try Again',"Cannot create spouse details",'error')
             return;
            })
          } else{

              Swal.fire('Please Try Again',"IC Number already Existed in the Database",'error')
              return;
          } 
        })

      } else {
        Swal.fire('Please Try Again',"Incorrect IC Number format",'error')
        return;
      }
    } else {

      Swal.fire('Please Try Again',"Cannot Leave the field Blank",'error')
      return;
    }
   


  }










  //child-----------------------------------------------------------------------

  showChild(){
    this.showAddChild = true;
    this.childName = "";
    this.childIC = "";
    this.childNumber = "";
  }

  cancelChild(){
    this.showAddChild = false;
  }

  submitChild(){

    const name = this.childName;
    const IC = this.childIC;
    const Number = this.childNumber;
    const rid = this.id;
    const relationship = "child";
    const IC_Number = IC+"-"+Number;
    

    var exp = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");

    if (name !== "" && IC !== "" && Number !== ""){

      if(exp.test(Number) && Number.length == 6){


        var child = {
          name: name,
          IC_Number: IC_Number,
          rid: rid,
          relationship:relationship
        }

        this.relativeService.findByIC(IC_Number).subscribe(data=> {
          this.childDataAttay = data;

          if (this.childDataAttay.length == 0){
            this.relativeService.createRelative(child).subscribe(data=> {
              Swal.fire('Child Added','successfully add child','success');
              this.retrieveRelative();
              this.showAddChild = false;
              return;
            },error=> {
              Swal.fire('Please Try Again',"Cannot update child details",'error')
              return;
            })
          } else {

            Swal.fire('Please Try Again',"Cannot add child, Child with same data is already existed in the database",'error')
              return;


          }
        },error=> {
          Swal.fire('Please Try Again',"Cannot update spouse details",'error')
          return;
        })


      } else {
        Swal.fire('Please Try Again',"Incorrect IC Number format",'error')
        return;
      }

    } else {
      
      Swal.fire('Please Try Again',"Cannot Leave the field empty",'error')
      return;
    }
    

  }



  onDeleteChild(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible. Deleting the child details may cause data loss',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'

    }).then((result) => {

      if (result.value){

        this.relativeService.delete(id).subscribe(result=> {

          Swal.fire(
            'Success',
            'Successfully delete child detail',
            'success'
          )

          this.retrieveRelative()

          return;


        },error=> {
          Swal.fire(
            'Process Failed',
            'Child is still in the database.',
            'error'
          )
          return;
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Child is still in the database.',
          'error'
        )
        return;
      }
    });
  }

  onEditChild(data,i){
    this.number = i;
    this.showEdit = true;
    this.newChildICNumber = data.IC_Number;
    this.newChildName = data.name;
  }

  cancelSaveChild(){
    this.showEdit = false;
    this.newChildName = "";
    this.newChildICNumber = "";
  }


  saveChild(data,i){

    const name = this.newChildName;
    const IC_Number = this.newChildICNumber;
    const IC = this.newChildICNumber.substring(0,2);
    var lengthNo = this.newChildICNumber.length;
    console.log(lengthNo)
    const Number = this.newChildICNumber.substring(3,lengthNo);
    const relationship = "child";
    const compareIC = data.IC_Number;
    const compareID = data.id;
    console.log(data.IC_Number)
    console.log(Number)

    var exp = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");

    if (name !=="" && IC_Number !== ""){

      if (exp.test(Number) && Number.length == 6){

        var child= {
      
          rid: this.id,
          name: name,
          IC_Number: IC_Number,
          relationship: relationship

        }

        this.relativeService.findByIC(IC_Number).subscribe(data=> {
          this.editChildArray = data;


          if (this.editChildArray == 0){

            this.relativeService.update(compareID,child).subscribe(data=> {
              Swal.fire('Success','successfully updated child details','success')
              this.retrieveRelative();
              this.showEdit = false;
              this.newChildICNumber = "";
              this.newChildName = ""
              return;
            }, error=> {

              Swal.fire("Process Failed","Relative is still in the database","error")
              return;
            })
          } else {
            if (compareIC == this.editChildArray[0].IC_Number){

              this.relativeService.update(compareID,child).subscribe(data=> {
                Swal.fire('Success','successfully updated child details','success')
                this.retrieveRelative();
                this.showEdit = false;
                this.newChildICNumber = "";
                this.newChildName = ""
                return;
              }, error=> {
  
                Swal.fire("Process Failed","Relative is still in the database","error")
                return;
              })

            } else {

              
              Swal.fire("Duplicate error","Child details is already existed in the database, Please Try Again","error")
              return;

            }
          }
        })


      } else {
        Swal.fire('Please Try Again',"Incorrect IC Number format",'error')
        return;
      }


    } else {

      Swal.fire(
        'PLease try again',
        'Cannot leave the field empty',
        'error'
      )
      return;
    }
  

    

  }



  openSideProfile(id){
    
    console.log(id)

    this.slidePanel.open(SideProfileComponent, {
      slideFrom:'right',
      panelClass: "edit-modalbox1",
      data: {
        dataKey: id,
      }
    })

}


retrieveID(profileName){
  var localaccount = sessionStorage.getItem('username')
  this.accountService.findByUsername(localaccount).subscribe(data=> {
    this.profileArray = data;
    console.log(this.profileArray)
    const id = this.profileArray[0].id;
    this.openSideProfile(this.profileArray[0]);
})

}


onFileSelect(event){
  const fileValue = event.target.files[0];
  this.fileInputLabel = fileValue.name;
  this.fileUploadForm.value.uploadedImage = fileValue;

}


upload(){
  if (!this.fileUploadForm.value.uploadedImage){
    Swal.fire('Upload Failed','Please Try again','error')
  } else {
    console.log(this.fileUploadForm.value.uploadedImage)
    console.log(this.fileUploadForm.value.name)
    var accountRID = sessionStorage.getItem('rid')
    const formData = new FormData()
    formData.append('image',this.fileUploadForm.value.uploadedImage);
    formData.append('vendor_rid',this.rid)
    formData.append('rid',this.rid)
    formData.append('account_rid',accountRID);
    formData.append('name',this.fileUploadForm.value.name)

    this.attachmentService.uploadFile(formData).subscribe(response => {
      console.log(response);
      if (response.statusCode === 200) {
        this.fileInputLabel = undefined;
      }

      Swal.fire("Success","Image has successfully uploaded",'success')
      this.fileUploadForm.reset();
      this.retrieveAttachment();
      this.uploadFile = false;
    }, er => {
      console.log(er);
      Swal.fire("Upload Failed",'Please Try Again / Unsupported File Format','error');
      return;
    });
  }
}

retrieveAttachment(){
  this.attachmentService.findByVendorid(this.rid).subscribe(data=> {
    this.initialAttachment = data;
   
    if (this.initialAttachment.length !== 0){
      var Link = "";
      for(let i = 0; i<this.initialAttachment.length; i++){
        Link = this.baseURL+"/"+this.initialAttachment[i].link;
        this.initialAttachment[i].link = Link;

        if (this.initialAttachment[i].type !== "image/png" || this.initialAttachment[i].type !== "image/jpg" || this.initialAttachment[i].type !== "image/jpeg" || this.initialAttachment[i].type !== "image/gif" ){
          this.initialAttachment[i].application = true;
        } else {
          this.initialAttachment[i].application = false;
        }
      }

      console.log(this.initialAttachment)
      this.attachmentArray = this.initialAttachment;
    } else {
      this.attachmentArray = [];
    }

  },error=> {
    console.log(error)
  })
}

deleteAttachment(data){

  var imageID = data.id;

  Swal.fire({
    title: 'Are you sure?',
    text: 'This process is irreversible. Deleting the image may cause data loss',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think'

  }).then((result) => {

    if (result.value){

      this.attachmentService.delete(imageID).subscribe(result=> {

        Swal.fire(
          'Success',
          'Successfully delete the selected image',
          'success'
        )

        this.retrieveAttachment()

        return;


      },error=> {
        Swal.fire(
          'Cannot delete image',
          'Attachment is still in the database.',
          'error'
        )
        return;
      })


    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Attachment is still in the database.',
        'error'
      )
      return;
    }
  });

}

cancelAttachment(){
  this.fileUploadForm.reset();
  this.uploadFile = false;
  this.retrieveAttachment();
}

retrieveRemarks(){


  this.remarkService.findByRid(this.id).subscribe(data=> {
    this.RemarksArray = data;

    if(this.RemarksArray.length !== 0){
      this.descriptionRemarks = this.RemarksArray[0].Description;
      this.description = this.RemarksArray[0].Description;
      console.log(this.descriptionRemarks)
      console.log(this.RemarksArray.length)
    } else {
      this.description = "";
      this.descriptionRemarks = "";
    }
   
    
  }, error=> {
    console.log(error)
  })

}

showEditRemarks(){
  this.onEditRemarks = true;
}

cancelRemarks(){
  this.onEditRemarks = false;
  this.retrieveRemarks();
}

submitRemarks(){

  const description = this.description;
  console.log(this.description)
  const account_rid = sessionStorage.getItem('rid');
  const rid = this.id;


  this.remarkService.findByRid(this.id).subscribe(data=> {
    this.RemarksArray = data;

    if(this.RemarksArray.length == 0){

      var remarks = {
        rid: rid,
        account_rid: account_rid,
        Description: this.description,
      }
  
      this.remarkService.create(remarks).subscribe(data=> {
  
        Swal.fire("Success","Successfully created remarks",'success')
        this.onEditRemarks = false;
        this.retrieveRemarks()
        return;
  
      },error=> {
        Swal.fire("Failed","Cannot create remarks",'error')
        return;
      });


    } else {

      var remarks1 = {
        id: this.RemarksArray[0].id,
        rid: rid,
        account_rid: account_rid,
        Description: description,
      }
  
      this.remarkService.update(this.RemarksArray[0].id, remarks1).subscribe(data=> {
        Swal.fire("Success","Successfully updated remarks",'success')
        this.onEditRemarks = false;
        this.retrieveRemarks()
        return;
      },error=> {
        Swal.fire("Failed","Cannot update remarks",'error')
        return;
      });
    }
   
    
  }, error=> {
    console.log(error)
  })

}



retrieveProfilePic(){
  var accountRID = sessionStorage.getItem('rid');
  this.photoService.findByRid(accountRID).subscribe(data=> {
    this.picArray = data;
    console.log(this.picArray)

    if (this.picArray.length !== 0){
      var baseURL = this.photoService.baseURL();
      this.proPic = baseURL+"/"+this.picArray[0].link;
      console.log(this.proPic)
      this.profileID = this.picArray[0].id;
    }

  },error=> {
    console.log(error)
  })
}

openFile(data){
  window.open(data)
}













}



