output "ec2_public_ip" {
  value = aws_instance.Cloud-Docker-EC2.public_ip
}

output "aws_db_instance_address" {
  value = aws_db_instance.cloud_db.address
  
}