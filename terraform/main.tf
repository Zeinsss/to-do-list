terraform {
  cloud {

    organization = "zeins-terraform"

    workspaces {
      name = "terraform-cloud-todo"
    }
  }
}

resource "aws_instance" "Cloud-Docker-EC2" {
  ami           = "ami-003f5a76758516d1e" 
  instance_type = "t2.micro"
  security_groups = [ 
    "launch-wizard-18"
   ]
   vpc_security_group_ids = [ "sg-0c6e882a3e7cbbded" ]
  tags = {
    Name = "Cloud-Docker-EC2"
  }
}

resource "aws_db_instance" "cloud_db" {
  allocated_storage   = 20
  engine              = "mysql"
  engine_version      = "8.0.39"
  instance_class      = "db.t4g.micro"
  username            = "admin"
  vpc_security_group_ids = [ "sg-0dee835cc78244bc0" ]
  storage_encrypted = true
  copy_tags_to_snapshot = true
  max_allocated_storage = 1000
  publicly_accessible = true
  skip_final_snapshot = true
}


