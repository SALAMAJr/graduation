import 'dart:io';
import 'package:dotted_border/dotted_border.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:furniswap/data/models/revModel/ReviewResponseModel.dart';
import 'package:furniswap/presentation/manager/reviewCubit/cubit/update_review_cubit.dart';
import 'package:furniswap/presentation/screens/messagesListScreen.dart';
import 'package:furniswap/presentation/screens/notificationsScreen.dart';
import 'package:get_it/get_it.dart';
import 'package:image_picker/image_picker.dart';

class EditReviewScreen extends StatefulWidget {
  final ReviewModel review;
  const EditReviewScreen({super.key, required this.review});
  @override
  State<EditReviewScreen> createState() => _EditReviewScreenState();
}

class _EditReviewScreenState extends State<EditReviewScreen> {
  late double rating;
  late TextEditingController _reviewController;
  final List<File> _selectedImages = [];

  @override
  void initState() {
    super.initState();
    rating = (widget.review.rating ?? 0).toDouble();
    _reviewController =
        TextEditingController(text: widget.review.comment ?? "");
  }

  Future<void> _pickImage() async {
    showModalBottomSheet(
      backgroundColor: Colors.white,
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (context) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(Icons.camera_alt, color: Color(0xff694A38)),
                title: const Text("Take a photo"),
                onTap: () async {
                  Navigator.pop(context);
                  final pickedFile =
                      await ImagePicker().pickImage(source: ImageSource.camera);
                  if (pickedFile != null) {
                    setState(() {
                      _selectedImages.add(File(pickedFile.path));
                    });
                  }
                },
              ),
              ListTile(
                leading:
                    const Icon(Icons.photo_library, color: Color(0xff694A38)),
                title: const Text("Choose from gallery"),
                onTap: () async {
                  Navigator.pop(context);
                  final pickedFile = await ImagePicker()
                      .pickImage(source: ImageSource.gallery);
                  if (pickedFile != null) {
                    setState(() {
                      _selectedImages.add(File(pickedFile.path));
                    });
                  }
                },
              ),
            ],
          ),
        );
      },
    );
  }

  void _removeImage(int index) {
    setState(() {
      _selectedImages.removeAt(index);
    });
  }

  void _saveChanges(BuildContext context) {
    // استخدم Cubit لتحديث الريفيو
    context.read<UpdateReviewCubit>().updateReview(
          reviewId: widget.review.id ?? "",
          rating: rating.toInt(),
          comment: _reviewController.text,
        );
  }

  @override
  Widget build(BuildContext context) {
    // معالجه null لأي حاجة ممكن تيجي ناقصة من الـ API
    final product = widget.review.product;
    final productName = product?.name ?? "No Name";
    final productImage = (product?.imageUrl?.isNotEmpty ?? false)
        ? NetworkImage(product!.imageUrl!)
        : const AssetImage("assets/images/default_avatar.png") as ImageProvider;

    return BlocProvider<UpdateReviewCubit>(
      create: (_) => GetIt.I<UpdateReviewCubit>(),
      child: BlocListener<UpdateReviewCubit, UpdateReviewState>(
        listener: (context, state) {
          if (state is UpdateReviewSuccess) {
            Navigator.pop(context, state.review);
          }
          if (state is UpdateReviewFailure) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(state.message)),
            );
          }
        },
        child: Scaffold(
          backgroundColor: const Color(0xffF5EFE6),
          appBar: AppBar(
            backgroundColor: Colors.white,
            title: const Text(
              "Edit Review",
              style: TextStyle(
                color: Color(0xff694A38),
                fontWeight: FontWeight.bold,
              ),
            ),
            centerTitle: true,
            actions: [
              IconButton(
                icon: const Icon(Icons.notifications_none,
                    color: Color(0xff694A38)),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => NotificationsScreen()),
                  );
                },
                style: TextButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 3),
                  minimumSize: Size.zero,
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
              ),
              IconButton(
                icon: const Icon(Icons.sms_outlined, color: Color(0xff694A38)),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => MessagesListScreen()),
                  );
                },
                style: TextButton.styleFrom(
                  padding: const EdgeInsets.only(left: 3, right: 8),
                  minimumSize: Size.zero,
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
              ),
            ],
          ),
          body: BlocBuilder<UpdateReviewCubit, UpdateReviewState>(
            builder: (context, state) {
              return Stack(
                children: [
                  SingleChildScrollView(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            CircleAvatar(
                              backgroundImage: productImage,
                              radius: 24,
                            ),
                            const SizedBox(width: 10),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(productName,
                                    style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16)),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text("Your Rating",
                                  style: TextStyle(
                                      fontSize: 14, color: Color(0xff8B7355))),
                              const SizedBox(height: 8),
                              RatingBar.builder(
                                initialRating: rating,
                                minRating: 1,
                                direction: Axis.horizontal,
                                allowHalfRating: true,
                                itemCount: 5,
                                itemSize: 30,
                                glowColor: const Color(0xffD4A977),
                                unratedColor: const Color(0xffE0D4C5),
                                itemBuilder: (context, _) => const Icon(
                                    Icons.star,
                                    color: Color(0xffD4A977)),
                                onRatingUpdate: (value) {
                                  setState(() {
                                    rating = value;
                                  });
                                },
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),
                        Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text("Your Review",
                                  style: TextStyle(
                                      fontSize: 14, color: Color(0xff8B7355))),
                              const SizedBox(height: 8),
                              TextFormField(
                                controller: _reviewController,
                                maxLines: 4,
                                decoration: InputDecoration(
                                  hintText: "Write something...",
                                  filled: true,
                                  fillColor: const Color(0xffFAF7F4),
                                  enabledBorder: OutlineInputBorder(
                                    borderSide: BorderSide.none,
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderSide: BorderSide.none,
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  contentPadding: const EdgeInsets.all(12),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Wrap(
                            spacing: 10,
                            runSpacing: 10,
                            children: [
                              InkWell(
                                onTap: _pickImage,
                                child: DottedBorder(
                                  color: const Color(0xffB8A69B),
                                  strokeWidth: 1,
                                  dashPattern: [6, 3],
                                  borderType: BorderType.RRect,
                                  radius: const Radius.circular(12),
                                  child: Container(
                                    width: 80,
                                    height: 80,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(12),
                                      color: const Color(0xffF5F3F1),
                                    ),
                                    child: const Center(
                                        child: Icon(Icons.camera_alt,
                                            color: Color(0xffB8A69B))),
                                  ),
                                ),
                              ),
                              ...List.generate(_selectedImages.length, (index) {
                                return Stack(
                                  children: [
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(12),
                                      child: Image.file(
                                        _selectedImages[index],
                                        width: 80,
                                        height: 80,
                                        fit: BoxFit.cover,
                                      ),
                                    ),
                                    Positioned(
                                      top: -10,
                                      right: -10,
                                      child: IconButton(
                                        icon: const Icon(Icons.cancel,
                                            color: Colors.white),
                                        onPressed: () => _removeImage(index),
                                        style: IconButton.styleFrom(
                                            minimumSize: const Size(28, 28)),
                                      ),
                                    ),
                                  ],
                                );
                              }),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (state is UpdateReviewLoading)
                    Container(
                      color: Colors.black12,
                      child: const Center(child: CircularProgressIndicator()),
                    ),
                ],
              );
            },
          ),
          bottomNavigationBar: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: const BoxDecoration(color: Colors.white),
            child: ElevatedButton(
              onPressed: () => _saveChanges(context),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xff694A38),
                elevation: 0,
                minimumSize: const Size(double.infinity, 48),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10)),
              ),
              child: const Text("Save Changes",
                  style: TextStyle(color: Colors.white, fontSize: 16)),
            ),
          ),
        ),
      ),
    );
  }
}
